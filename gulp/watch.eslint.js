/* global gulp */
var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

gulp.task(taskname, function() {
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