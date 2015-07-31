var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);

var dest = config.dest;

gulp.task(taskname, function() {
	g.watch(config.htdocs.watch, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events
			.pipe(gulp.dest(config.htdocs.dest))
			.pipe(g.connect.reload())
		events.on("end", done);
	}));
});