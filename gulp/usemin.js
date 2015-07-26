var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var util = require("./util");
var eslintp = require("./eslintp");
var browserifyp = require("./browserifyp");

gulp.task(taskname, function() {
	return gulp.src(config.html.src)
		.pipe(g.usemin({
			vendorsjs: [],
			js: [browserifyp(), "concat"]
		}))
		.pipe(gulp.dest(config.dest))
});