"use strict";
const exec = require('child_process').exec;
const parseStreams = require('./parseStreams');
const parseDevices = require('./parseDevices');


const changeDefaultAudioDevice = function(){
	//Grab a list of every audio output devices
	exec('pacmd list-sinks', function(error, results, stderr){
		const devices = parseDevices(results);

		let dmenuItems;
		for(let i=0, L = devices.length; i < L; i++){
			dmenuItems += devices[i] + '\n';
		}

		//Push them into a dmenu and have the user select one
		exec('echo -e "' + dmenuItems + '" | dmenu', function(error, dOut, stderr){
			dOut = dOut.slice(0,dOut.lastIndexOf('\n'));

			//Update the default sink to the user selected item
			exec('pacmd set-default-sink "'+dOut+'"');

			//Get a list of every audio stream currently active
			exec('pacmd list-sink-inputs', function(error, aOut, stderr){
				const streams = parseStreams(aOut);


				for(let i = 0, L = streams.length; i < L; i++){
					if(streams[i].applicationname !== 'TeamSpeak3'){//All except teamspeak
						exec('pactl move-sink-input ' + streams[i].index + ' "' + dOut + '"');//Move the stream to the selected sink
					}
				}
			});
		});
	});
};

module.exports = changeDefaultAudioDevice;
