const exec = require('child_process').exec;
const parseStreams = require('../parseStreams');

module.exports = function(streamIndex, outputIndex){    
    return new Promise((reject, resolve) => {
        try{
            exec(`pactl move-sink-input ${streamIndex} ${outputIndex}`, function(error, aOut, stderr){
                if(error) {
                    reject(error);
                }
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};