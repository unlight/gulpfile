var config = require("./config");
var util = require("./util");
var browserifyp = require("./browserifyp");
var eslintp = require("./eslintp");
var basename = require("basename");

gulp.task("scripts.watch", function() {
	var w = gulp.watch(config.scripts.watch, gulp.series("scripts.build"));
	w.on("change", g.memoryCache.update("scripts"));
});

gulp.task("scripts.build", function() {
	var options = {};
	return gulp.src(config.scripts.main, options)
		.pipe(eslintp())
		.pipe(browserifyp())
		// .pipe(g.debug())
		// .pipe(transform(function(file) {
		// 	return exorcist(config.scripts.dest + "/" + basename(file) + ".map");
		// }))
		.pipe(g.if(config.production, g.ngAnnotate()))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(g.connect.reload())
});