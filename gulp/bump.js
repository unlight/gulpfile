var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

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