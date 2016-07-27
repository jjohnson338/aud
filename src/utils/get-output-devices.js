const exec = require('child_process').exec;
const parseDevices = require('../parseDevices');

module.exports = function(){
    return new Promise((resolve, reject) => {
        try{
            exec("pacmd list-sources | grep -e device.string -e 'name:'", function(error, results, stderr){
                if(error){
                    reject(error);
                }
                const devices = parseDevices(results);

                const devicesArray = [];

                for(let i=0, i2=0, L = devices.length; i < L; i++) {
                    if (devices[i].indexOf('monitor') <= -1) {
                        devicesArray.push({
                            index: i2++,
                            name: devices[i],
                        });
                    }
                }

                resolve(devicesArray);
            });
        } catch (e) {
            reject(e);
        } 
    });
};