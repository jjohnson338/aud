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
	return devices;
};

module.exports = parseDevices;
