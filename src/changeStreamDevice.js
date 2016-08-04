"use strict";
const getOutputStreams = require("./utils/get-output-streams");
const getOutputDevices = require("./utils/get-output-devices");
const moveStreamOutput = require("./utils/move-stream-output");
const displayDmenu = require("./utils/display-dmenu");

module.exports = function changeStreamDevice(){

    let streamsArray;
    let devicesArray;    
    let selectedStream;

    getOutputStreams().then(streams => {
        streamsArray = streams;
        let streamsDList = '';
        for(let i=0,L=streams.length;i<L;i++){
            streamsDList += streams[i].name;
            streamsDList += i!=L-1 ? '\n' : '';
        }
        
        return displayDmenu(streamsDList);
    }).then(selectedOption => {
        selectedStream = streamsArray.find((obj) => {
            return obj.name === selectedOption;
        });
    }).then(() => {
        return getOutputDevices();
    }).then(devices => {
        devicesArray = devices;
        let dmenuItems = '';
      	for(let i=0, L = devices.length; i < L; i++){
      		dmenuItems += devices[i].name;
            dmenuItems += i!=L-1 ? '\n' : '';
      	}
        return displayDmenu(dmenuItems);
    }).then(selectedOption => {
        return devicesArray.find((obj) => {
                return obj.name === selectedOption;
        });  
    }).then(selectedDevice => {
        return moveStreamOutput(selectedStream.index, selectedDevice.index);
    }).catch(e => {
        console.log(e);
    });
};
