var browserify = require("browserify");
var config = require("./config");
var through2 = require("through2");

var options = {
	paths: ["src/scripts", "src", "node_modules", "./"],
	debug: true,
	transform: ["brfs"]
};

function browserifyp() {
	return through2.obj(function(chunk, enc, callback) {
		var b = browserify(chunk.path, options);
		b.bundle(function(err, buffer) {
			if (err) throw err;
			chunk.contents = buffer;
			callback(null, chunk);
		});
	});
};

module.exports = browserifyp;
module.exports.options = options;