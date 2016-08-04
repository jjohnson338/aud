"use strict";
const getOutputDevices = require('./utils/get-output-devices');
const getOutputStreams = require("./utils/get-output-streams");
const displayDmenu = require("./utils/display-dmenu");
const setDefaultSource = require("./utils/set-default-source");
const moveStreamOutput = require("./utils/move-stream-output");


module.exports = function changeDefaultAudioDevice(){
        let devicesArray;
        let selectedDevice;
        getOutputDevices().then((devices) => {
            devicesArray = devices;

            let dmenuItems = '';
            for(let i=0, L = devices.length; i < L; i++){
                dmenuItems += devices[i].name;
                dmenuItems += i!=L-1 ? '\n' : '';
            }
            return dmenuItems;
        }).then(dmenuItems => {
            return displayDmenu(dmenuItems);
        }).then(selectedOption => {
            selectedDevice = devicesArray.find((obj) => {
                return obj.name === selectedOption;
            });

            return setDefaultSource(selectedOption);            
        }).then(() => {
            return getOutputStreams();
        }).then(streams => {
            for(let i = 0, L = streams.length; i < L; i++){
					if(streams[i].applicationname !== 'TeamSpeak3'){//All except teamspeak
                        moveStreamOutput(streams[i].index, selectedDevice.index);
					}
				}
        }).catch(e => {
            console.log(e);
        });
};