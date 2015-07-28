var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

// Build client javascript.

gulp.task(taskname, function() {
	return gulp.src(config.scripts.src, {
			since: g.memoryCache.lastMtime("buildscripts")
		})
		.pipe(eslintp())
		.pipe(g.memoryCache("buildscripts"))
		// concat or browserify goes here
		.pipe(gulp.dest(config.scripts.dest))
		// .pipe(g.connect.reload())
});