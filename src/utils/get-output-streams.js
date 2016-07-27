const exec = require('child_process').exec;
const parseStreams = require('../parseStreams');

module.exports = function(){
    return new Promise((resolve, reject) => {
        try{
            exec('pacmd list-sink-inputs', function(error, aOut, stderr){
                if(error){
                    reject(error);
                }                
                resolve(parseStreams(aOut));
            });
        } catch (e) {
            reject(e);
        }
    });
};