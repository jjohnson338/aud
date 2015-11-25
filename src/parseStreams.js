"use strict";
const parseStreams = function(out){
	var streams = [];
	var i = out.indexOf('index: ');
	while(i != -1){
		out = out.slice(i+6);
		var j = out.indexOf('driver:');
		var index = out.slice(0,j).trim();
		out = out.slice(j);

		i = out.indexOf('application.name = "');
		out = out.slice(i+20);
		j = out.indexOf('"');
		var applicationname = out.slice(0,j);

		streams.push({'index': index, 'applicationname' : applicationname});
		i = out.indexOf('index: ');
	}
	return streams;
};

module.exports = parseStreams;
