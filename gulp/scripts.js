var config = require("./config");
// var util = require("./util");
var eslintp = require("./eslintp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");

gulp.task("scripts.browserify", function() {
	var options = {
		detectGlobals: false,
		paths: ["src/scripts", "src", "node_modules", "./"],
		debug: config.debug,
		// noParse: config.vendors
		// transform: ["brfs", "folderify"]
	};
	var b = browserify(config.scripts.main, options);
	config.vendors.forEach(function(v) {
		b.external(v);
	});
	return b.bundle()
		.pipe(source("main.js"))
		.pipe(buffer())
		.pipe(g.sourcemaps.init({loadMaps: true}))
		.pipe(g.if(config.production, g.ngAnnotate()))
		.pipe(g.if(config.production, g.uglify()))
		.pipe(g.sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(g.connect.reload());
});

gulp.task("scripts.watch", function() {
	// TODO: use g.batch here
	g.watch(config.scripts.watch, gulp.series("scripts.browserify"));
});

gulp.task("scripts.vendors", function() {
	var b = browserify({
		detectGlobals: false,
		require: config.vendors,
		// standalone: true
	});
	return b.bundle()
		.pipe(source("vendors.js"))
		.pipe(buffer())
		.pipe(g.sourcemaps.init({loadMaps: true}))
		.pipe(g.if(config.production, g.uglify()))
		.pipe(g.sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest));
});

