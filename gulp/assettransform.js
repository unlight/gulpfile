var config = require("./config");
var util = require("./util");
var eslintp = require("./eslintp");
var browserify = require("./browserify");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function() {

	var atp = g.assetTransform({
		vendorsjs: {
			tasks: [g.uglify()],
		},
		js: {
			tasks: ["browserify"]
		},
	});

	return gulp.src(config.src.html)
		.pipe(atp)
		.pipe(g.debug())
		.pipe(gulp.dest(config.dest));
});