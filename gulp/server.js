var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function() {
	g.connect.server({
		root: config.server.root,
		port: 3000,
		livereload: true
	});

	g.watch(config.server.watch, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", function(file) {
			var niceRelativePath = file.path.slice(file.cwd.length + 1);
			g.util.log(g.util.colors.magenta(niceRelativePath), "was changed");
		});
		events.pipe(g.connect.reload());
		events.on("end", done);
	}));
});