"use strict";
const exec = require('child_process').exec;
const findStreamByAppName = require('./findStreamByAppName');
const parseStreams = require('./parseStreams');


const changeAudioStreamLevels = function(){
  //Get a list of every audio stream currently active
  exec('pacmd list-sink-inputs', function(error, aOut, stderr){
    const streams = parseStreams(aOut);

    let dMenuList = '';
    for(let i = 0, L = streams.length; i < L; i++){
      dMenuList += streams[i].applicationname + '\n';
    }

    //Present the choice of app to the user
    exec('echo "' + dMenuList + '" | dmenu', function(error, dOut, stderr){
      dOut = dOut.slice(0,dOut.indexOf('\n'));//Trim the newline char

      const percentageList = '0%\n10%\n20%\n30%\n%40\n50%\n60%\n70%\n80%\n90%\n100%\n';

      //Present the choice of volume level to the user
      exec('echo "' + percentageList + '" | dmenu', function(error, pOut, stderr){
        pOut = pOut.slice(0,pOut.indexOf('\n'));//Trim trailing \n
        const stream = findStreamByAppName(streams, dOut);
        //Execute the command to change the volume
        exec('pactl set-sink-input-volume '+ stream.index + ' ' + pOut);
      });
    });
  });
};

module.exports = changeAudioStreamLevels;
