const exec = require('child_process').exec;

module.exports = function(selectedOption){
    return new Promise((resolve, reject) => {
        try{
            exec(`pacmd set-default-source '${selectedOption}'`, function(error){
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