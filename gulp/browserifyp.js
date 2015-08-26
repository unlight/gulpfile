var browserify = require("browserify");
var config = require("./config");
var through2 = require("through2");

module.exports = function() {
	var options = {
		paths: ["src/scripts", "src", "node_modules", "./"],
		debug: true,
	};
	return through2.obj(function(chunk, enc, callback) {
		var b = browserify(chunk.path, options);
		b.bundle(function(err, buffer) {
			if (err) throw err;
			chunk.contents = buffer;
			callback(null, chunk);
		});
	});
};