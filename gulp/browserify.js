var browserify = require("browserify");
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyp = require("./browserifyp");

gulp.task(taskname, function() {
	gulp.src(config.scripts.main)
		.pipe(browserifyp())
		.pipe(gulp.dest(config.scripts.dest));

});