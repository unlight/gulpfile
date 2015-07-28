var basename = require("basename");
var taskname = basename;
var config = require("./config");

gulp.task(taskname, function () {
	// gulp bump -m
	var options = {};
	if (argv.m) {
		options.type = "minor";
	}
	gulp.src(config.bump.src)
		.pipe(g.bump())
		.pipe(gulp.dest(config.bump.dest));
});