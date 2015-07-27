var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

// Build client javascript.

gulp.task(taskname, function() {
	var options = {
		since: g.memoryCache.lastMtime("buildscripts")
	};
	return gulp.src(config.scripts.src, options)
		.pipe(eslintp())
		.pipe(g.memoryCache("buildscripts"))
		// concat or browserify goes here
		.pipe(gulp.dest(config.scripts.dest))
		// .pipe(g.connect.reload())
});