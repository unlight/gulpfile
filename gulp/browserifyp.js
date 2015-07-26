var browserify = require("browserify");
var config = require("./config");
var through2 = require("through2");
var path = require("path");

module.exports = function() {
	var options = {
		paths: ["node_modules", "src", "./"],
		debug: true,
	};
	return through2.obj(function(chunk, enc, callback) {
		var b = browserify(options);
		config.vendors.forEach(function(v) {
			b.external(v);
		});
		b.add(chunk.path);
		b.bundle(function(err, buffer) {
			if (err) throw err;
			chunk.contents = buffer;
			callback(null, chunk);
		});
	});
};