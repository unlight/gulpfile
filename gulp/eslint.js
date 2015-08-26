/* global gulp */
var config = require("./config");
var util = require("./util");
var eslintp = require("./eslintp");

gulp.task("eslint", function() {
	return gulp.src(config.scripts.watch)
		.pipe(eslintp())
		.pipe(g.if(config.debug, g.plumber()));
});

gulp.task("eslint.watch", function() {
	g.watch(config.eslint.watch, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events
			.pipe(eslintp())
		events.on("end", done);
	}));
});