var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function() {
	g.connect.server({
		root: config.server.root,
		port: config.server.port || 3000,
		livereload: true
	});

	g.watch(config.server.reload, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events.pipe(g.connect.reload());
		events.on("end", done);
	}));
});