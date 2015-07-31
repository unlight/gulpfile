var exec = require("child_process").exec;
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function (done) {
	var cmd = exec("ping localhost", done);
	cmd.stdout.pipe(process.stdout);
});