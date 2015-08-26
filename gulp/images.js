var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function () {
	return gulp.src(config.images.src)
		.pipe(gulp.dest(config.images.dest));
});