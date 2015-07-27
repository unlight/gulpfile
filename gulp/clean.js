var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var del = require("del");

gulp.task(taskname, function (done) {
	del([config.dest + "/*"], done);
});