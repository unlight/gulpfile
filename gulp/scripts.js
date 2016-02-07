var config = require("./config");
// var util = require("./util");
var eslintp = require("./eslintp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");

function instance() {
	var b = browserify(config.scripts.main, {
		detectGlobals: false,
		// paths: ["src", "node_modules", "./"],
		debug: config.debug,
		// noParse: config.vendors
		// transform: ["brfs", "folderify"]
	});
	config.vendors.forEach(function(v) {
		b.external(v);
	});
	return b;
}

function bundle(b) {
	return b.bundle()
		.pipe(source("main.js"))
		.pipe(buffer())
		.pipe(g.sourcemaps.init({ loadMaps: true }))
		.pipe(g.if(config.production, g.ngAnnotate()))
		.pipe(g.if(config.production, g.uglify()))
		.pipe(g.sourcemaps.write("./"))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(g.connect.reload());
}

gulp.task("scripts.browserify", function(done) {
	var b = instance();
	var stream = bundle(b);
	stream.on("end", done);
});

gulp.task("scripts.watch", function(done) {
	var b = watchify(instance());
	bundle(b);
	// On any dep update, runs the bundler
	b.on("update", bundle.bind(null, b));
	// Output build logs to terminal
	b.on("log", g.util.log);
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