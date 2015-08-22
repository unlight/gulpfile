/* global gulp */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var config = require("./config");
var util = require("./util");
var lessp = require("./lessp");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task("design.build", function () {
	var production = config.production;
	return gulp.src(config.design.src, {/*since: g.memoryCache.lastMtime("design")*/})
		// .pipe(g.memoryCache("design"))
		// .pipe(lessp())
		.pipe(g.if(production, g.csso()))
		.pipe(gulp.dest(config.design.dest))
		.pipe(g.if(config.debug, g.connect.reload()))
		// .pipe(g.if(production, g.csso()))
		// .pipe(g.if(production, g.rename({ suffix: ".min" })))
		// .pipe(gulp.dest(config.design.dest));
});


gulp.task("design.watch", function() {
	var w = gulp.watch(config.design.watch, gulp.series("design.build"));
	w.on("change", g.memoryCache.update("design"));
	// g.watch(config.design.watch, {
	// 	ignoreInitial: false,
	// 	verbose: false
	// }, g.batch(function(events, done) {
	// 	events.on("data", util.niceRelativePath);
	// 	events
	// 		.pipe(lessp())
	// 		.pipe(gulp.dest(config.design.dest))
	// 		.pipe(g.connect.reload());
	// 	events.on("end", done);
	// }));
});