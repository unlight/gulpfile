var browserify = require("browserify");
var config = require("./config");
var source = require("vinyl-source-stream");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyp = require("./browserifyp");

gulp.task(taskname, function() {
	gulp.src(config.clientjs.main)
		.pipe(browserifyp())
		.pipe(gulp.dest(config.clientjs.dest));

});