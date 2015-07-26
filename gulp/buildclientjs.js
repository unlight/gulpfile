var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

// Build client javascript.

gulp.task(taskname, function() {
	var options = {
		since: g.memoryCache.lastMtime("clientjs")
	};
	return gulp.src(config.clientjs.src, options)
		.pipe(eslintp())
		.pipe(g.memoryCache("clientjs"))
		// concat or browserify goes here
		.pipe(gulp.dest(config.dest));
});