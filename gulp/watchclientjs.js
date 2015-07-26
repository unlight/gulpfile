var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var util = require("./util");
var eslintp = require("./eslintp");
require("./buildclientjs");

gulp.task(taskname, function() {
	var options = {
		ignoreInitial: false,
		verbose: false
	};
	var w = g.watch(config.clientjs.src, options, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		gulp.series("buildclientjs");
		events.on("end", done);
	}));
	w.on("change", util.memoryCacheChange("clientjs"));
	w.on("unlink", util.memoryCacheUnlink("clientjs"));
	w.on("add", util.memoryCacheAdd("clientjs"));
});