
/* global gulp */
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyp = require("./browserifyp");

gulp.task(taskname + ".watch", function() {
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

gulp.task(taskname + ".build", gulp.series(
	gulp.parallel(t("design.build"), t("scripts.build")),
	function() {
		var production = config.production;
		return gulp.src(config.htdocs.src)
			.pipe(g.debug())
			.pipe(g.useAsset())
			.pipe(g.debug())
			.pipe(gulp.dest(config.htdocs.dest));
	}));