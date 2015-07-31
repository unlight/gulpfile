/* global gulp */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var config = require("./config");
var lessp = require("./lessp");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function () {
	var production = config.production;
	return gulp.src(config.design.src, {/*since: g.memoryCache.lastMtime("design")*/})
		// .pipe(g.memoryCache("design"))
		.pipe(lessp())
		.pipe(g.if(production, g.csso()))
		.pipe(gulp.dest(config.design.dest))
		.pipe(g.if(config.debug, g.connect.reload()))
		// .pipe(g.if(production, g.csso()))
		// .pipe(g.if(production, g.rename({ suffix: ".min" })))
		// .pipe(gulp.dest(config.design.dest));
});
