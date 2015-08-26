/* global t */
/* global gulp */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function() {
	return gulp.src(config.backend.solution)
		.pipe(g.msbuild({
			targets: ["Build"],
			configuration: "Debug",
			verbosity: "minimal",
			nologo: true,
			stdout: true
		}));
});