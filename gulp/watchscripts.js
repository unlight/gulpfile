var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var util = require("./util");
var eslintp = require("./eslintp");
require("./buildscripts");

gulp.task(taskname, function() {
	var options = {
		ignoreInitial: false,
		verbose: false
	};
	var w = g.watch(config.scripts.watch, options, g.batch(function(events, done) {
		gulp.series("buildscripts");
		//events.pipe(g.connect.reload());
		events.on("data", util.niceRelativePath);
		events.on("end", done);
	}));
	w.on("change", util.memoryCacheChange("buildscripts"));
	w.on("unlink", util.memoryCacheUnlink("buildscripts"));
	w.on("add", util.memoryCacheAdd("buildscripts"));
});