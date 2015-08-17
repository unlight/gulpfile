var config = require("./config");
var util = require("./util");
var browserifyp = require("./browserifyp");

gulp.task("scripts.watch", function() {
	var w = gulp.watch(config.scripts.watch, gulp.series("build.scripts"));
	w.on("change", g.memoryCache.update("scripts"));
});

gulp.task("build.scripts", function() {
	var options = {};
	// if (config.cache) {
	// 	options.since = g.memoryCache.lastMtime("scripts");
	// }
	return gulp.src(config.scripts.main, options)
		// .pipe(g.debug())
		.pipe(eslintp())
		// .pipe(g.memoryCache("scripts"))
		.pipe(browserifyp())
		.pipe(g.if(config.production, g.ngAnnotate()))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(g.connect.reload())
});