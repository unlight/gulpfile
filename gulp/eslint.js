var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var eslintp = require("./eslintp");

gulp.task(taskname, function() {
	var options = {
		since: gulp.lastRun(taskname)
	};
	return gulp.src(config.eslint.src, options)
		.pipe(eslintp());
});