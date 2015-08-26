var basename = require("basename");
var taskname = basename(__filename);
var config = require("./config");

gulp.task(taskname, function() {
	// gulp bump -m
	var options = {};
	if (argv.m) options.type = "minor";
	if (argv.setv) options.version = argv.setv;
	gulp.src(config.bump.src)
		.pipe(g.bump(options))
		.pipe(g.if(function(f) {
			return f.relative === "app.json";
		}, gulp.dest(config.bump.dest2)))
		.pipe(g.if(function(f) {
			return f.relative === "package.json";
		}, gulp.dest(config.bump.dest)));
});