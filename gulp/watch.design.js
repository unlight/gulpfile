var config = require("./config");
var util = require("./util");
var lessp = require("./lessp");
var basename = require("basename");
var taskname = basename(__filename);

require("./build.design");

gulp.task(taskname, function() {
	var w = gulp.watch(config.design.watch, gulp.series("build.design"));
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