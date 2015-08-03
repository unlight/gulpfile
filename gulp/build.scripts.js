var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyp = require("./browserifyp");
var eslintp = require("./eslintp");

gulp.task(taskname, function() {
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