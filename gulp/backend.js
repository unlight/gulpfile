var basename = require("basename");
var taskname = basename(__filename);
var util = require("./util");
var config = require("./config");

gulp.task(taskname + ".build", gulp.series(
	t("msbuild"),
	function() {
		return gulp.src(config.backend.src)
			.pipe(gulp.dest(config.dest));
	}
));

gulp.task(taskname + ".watch", function(done) {
	g.watch(config.backend.watch, {
		ignoreInitial: false,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events
			.pipe(gulp.dest(config.dest))
			.pipe(g.connect.reload());
		events.on("end", gulp.series([
			t("import"),
			done
		]));
	}));

});