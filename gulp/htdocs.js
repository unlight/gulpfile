/* global gulp */
var config = require("./config");
var browserifyp = require("./browserifyp");

gulp.task("htdocs.build", gulp.series(
	t("eslint"),
	gulp.parallel(t("design.build"), t("scripts.browserify"), t("scripts.vendors")),
	function() {
		return gulp.src(config.htdocs.src)
			.pipe(g.useAsset())
			.pipe(gulp.dest(config.htdocs.dest));
	}));

gulp.task("htdocs.watch", function() {
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