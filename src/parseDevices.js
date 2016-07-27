"use strict";
module.exports = function parseDevices(out){

    function getDeviceName(parseString){
        const begin = parseString.indexOf("<");        
        return parseString.substring(begin+1,parseString.length);
    }

    let devices = [];
    const parseArray = out.split(">");
    for(let i=0, L = parseArray.length; i < L; i++) {
        if(parseArray[i].indexOf("<") > -1) {
            devices.push(getDeviceName(parseArray[i]));
        }
    }
	return devices;
};