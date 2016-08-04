"use strict";
const getOutputStreams = require('./utils/get-output-streams');
const displayDmenu = require("./utils/display-dmenu");
const setStreamVolume = require("./utils/set-stream-volume");



const changeAudioStreamLevels = function(){
    let streamsArray;
    let selectedStream;

    getOutputStreams().then(streams => {
        streamsArray = streams;
        let dMenuList = '';
        for(let i = 0, L = streams.length; i < L; i++){
            dMenuList += streams[i].name;
            dMenuList += i!=L-1 ? '\n' : '';
        }
        return dMenuList;
    }).then(dMenuList => {
        return displayDmenu(dMenuList);
    }).then(selectedOption => {
        selectedStream = streamsArray.find((obj) => {
            return obj.name === selectedOption;
        });
    }).then(() => {
        const percentageList = '0%\n10%\n20%\n30%\n40%\n50%\n60%\n70%\n80%\n90%\n100%';
        return displayDmenu(percentageList);
    }).then(selectedPercentage => {
        
        return setStreamVolume(selectedStream.index, selectedPercentage);
    }).catch(e => {
        console.log(e);
    });
};

module.exports = changeAudioStreamLevels;
