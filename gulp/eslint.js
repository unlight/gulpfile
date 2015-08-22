/* global gulp */
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

gulp.task(taskname, function() {
	var options = {
		// since: gulp.lastRun(taskname)
	};
	return gulp.src(config.eslint.src, options)
		.pipe(eslintp())
		// .pipe(g.memoryCache("scripts"))
});

gulp.task(taskname + ".watch", function() {
	g.watch(config.eslint.watch, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events
			.pipe(eslintp())
			// .pipe(g.connect.reload())
		events.on("end", done);
	}));
});