var basename = require("basename");
var taskname = basename(__filename);
var config = require("./config");

gulp.task(taskname, function () {
	// gulp bump -m
	var options = {};
	if (g.util.env.m) {
		options.type = "minor";
	}
	gulp.src(config.bump.src)
		.pipe(g.bump())
		.pipe(gulp.dest(config.bump.dest));
});