"use strict";
const findStreamByAppName = function(streams, streamName){
  for(var i=0,L=streams.length;i<L;i++){
    if(streams[i].applicationname === streamName)
      return streams[i];
  }
};

module.exports = findStreamByAppName;
