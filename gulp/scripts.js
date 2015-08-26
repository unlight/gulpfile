var config = require("./config");
var util = require("./util");
var browserifyp = require("./browserifyp");
var eslintp = require("./eslintp");
var basename = require("basename");
var path = require("path");

gulp.task("scripts.browserify", function() {
	var options = {};
	// if (config.cache) {
	// 	options.since = g.memoryCache.lastMtime("scripts");
	// }
	return gulp.src(config.scripts.main, options)
		// .pipe(g.debug())
		// .pipe(eslintp())
		// .pipe(g.memoryCache("scripts"))
		.pipe(browserifyp())
		.pipe(g.sourcemaps.init({
			loadMaps: true
		}))
		.pipe(g.if(config.production, g.ngAnnotate()))
		.pipe(g.if(config.production, g.uglify()))
		.pipe(g.sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(g.connect.reload())
});

gulp.task("scripts.watch", function() {
	gulp.watch(config.scripts.watch, gulp.series("scripts.browserify"));
});

gulp.task("scripts.vendors", function() {
	return gulp.src([
			"node_modules/angular/angular.js"
		])
		.pipe(g.sourcemaps.init())
		.pipe(g.concat("vendors.js"))
		.pipe(g.if(config.production, g.uglify()))
		.pipe(g.sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest));
});