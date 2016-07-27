"use strict";
module.exports = function parseStreams(out){
	let streams = [];
	let i = out.indexOf('index: ');
	while(i != -1){
		out = out.slice(i+6);
		let j = out.indexOf('driver:');
		const index = out.slice(0,j).trim();
		out = out.slice(j);

		i = out.indexOf('application.name = "');
		out = out.slice(i+20);
		j = out.indexOf('"');
		const name = out.slice(0,j);

		streams.push({
                index, 
                name,
            });
		i = out.indexOf('index: ');
	}
	return streams;
};
