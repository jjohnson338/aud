"use strict";
const parseDevices = function(out){
	let devices = [];
	let i = out.indexOf('name: <');
	while(i != -1){
		out = out.slice(i+7);
		const j = out.indexOf('>');
		devices.push(out.slice(0,j));
		out = out.slice(j);
		i = out.indexOf('name: <');
	}
	for(let i=devices.length-1; i>=0; i--){
		if(devices[i].indexOf('hdmi') > 0)
			devices.splice(i, 1);
	}
	return devices;
};

module.exports = parseDevices;
