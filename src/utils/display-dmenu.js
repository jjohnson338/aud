const exec = require('child_process').exec;
module.exports = function(dmenuItems) {
    return new Promise((resolve, reject) => {
        try{
            exec(`echo -e "${dmenuItems}" | dmenu`, function(error, dOut, stderr){
                if(error){
                    reject(error);
                }
                resolve(dOut.slice(0,dOut.lastIndexOf('\n')));
            });
        } catch (e) {
            reject(e);
        }
    });
};