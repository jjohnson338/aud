const exec = require('child_process').exec;

module.exports = function(streamIndex, percentage){
    return new Promise((resolve, reject) => {
        try{            
            exec(`pactl set-sink-input-volume ${streamIndex} ${percentage}`, function(error){
                if(error){
                    reject(error);
                }
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};