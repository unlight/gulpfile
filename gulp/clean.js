var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, function (done) {
	var del = require("del");
	del([config.dest + "/*"], done);
});