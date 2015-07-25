var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function () {
	g.util.log("This is test.");
});