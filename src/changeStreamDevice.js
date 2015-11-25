"use strict";
const exec = require('child_process').exec;
const findStreamByAppName = require('./findStreamByAppName');
const parseStreams = require('./parseStreams');
const parseDevices = require('./parseDevices');

const changeStreamDevice = function(){
  //Get a list of every audio stream currently active
  exec('pacmd list-sink-inputs', function(error, aOut, stderr){
    const streams = parseStreams(aOut);

    let streamsDList = '';
    for(let i=0,L=streams.length;i<L;i++){
      streamsDList += streams[i].applicationname + '\n';
    }

    //Present the user with a choice of which app to switch
    exec('echo "'+streamsDList+'" | dmenu', function(error, dOut, stderr){
      dOut = dOut.slice(0,dOut.indexOf('\n'));//Trim the trailing new line char


      //Grab a list of every audio output devices
      exec('pacmd list-sinks', function(error, results, stderr){
      	const devices = parseDevices(results);

      	let dmenuItems;
      	for(let i=0, L = devices.length; i < L; i++){
      		dmenuItems += devices[i] + '\n';
      	}

        //Present the user with a choice of new output devices
        exec('echo "'+dmenuItems+'" | dmenu', function(error, d2Out, stderr){
          d2Out = d2Out.slice(0,d2Out.indexOf('\n'));//Trim the trailing new line char

          //Change the selected stream to the selected device
          exec('pactl move-sink-input ' + findStreamByAppName(streams, dOut).index + ' "' + d2Out +'"');
        });
      });
    });
  });
};

module.exports = changeStreamDevice;
