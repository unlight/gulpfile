var config = require("./config");
// var util = require("./util");
// var lessp = require("./lessp");

gulp.task("design.vendors", gulp.parallel(
	function copyfonts() {
		return gulp.src("node_modules/bootstrap/dist/fonts/*.*")
			.pipe(gulp.dest(config.design.dest + "/../fonts"));
	},
	function bootstrapcss() {
		return gulp.src("node_modules/bootstrap/dist/css/bootstrap.css")
			.pipe(gulp.dest(config.design.dest + "/../css"));

	}
));

gulp.task("design.build", function() {
	return gulp.src(config.design.src, { /*since: g.memoryCache.lastMtime("design")*/ })
		// .pipe(g.memoryCache("design"))
		// .pipe(lessp())
		// .pipe(g.if(production, g.csso()))
		.pipe(gulp.dest(config.design.dest))
		.pipe(g.connect.reload())
		// .pipe(g.if(config.debug, g.connect.reload()))
		// .pipe(g.if(production, g.csso()))
		// .pipe(g.if(production, g.rename({ suffix: ".min" })))
		// .pipe(gulp.dest(config.design.dest));
});


gulp.task("design.watch", function() {
	var w = gulp.watch(config.design.watch, gulp.series(
		t("design.build")
	));

	// g.watch(config.design.watch, {
	// 	ignoreInitial: false,
	// 	verbose: false
	// }, g.batch(function(events, done) {
	// 	events.on("data", util.niceRelativePath);
	// 	events
	// 		.pipe(lessp())
	// 		.pipe(gulp.dest(config.design.dest))
	// 		.pipe(g.connect.reload());
	// 	events.on("end", done);
	// }));
});