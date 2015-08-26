var streamCombiner = require("stream-combiner");
var config = require("./config");

var lessp = function () {
	return streamCombiner([
		g.if(config.debug, g.sourcemaps.init()),
		g.less(),
		g.if(config.debug, g.sourcemaps.write("./"))
	]);
};

module.exports = lessp;