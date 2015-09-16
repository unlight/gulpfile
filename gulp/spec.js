var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);

var open = require("open");

var openSpec = function() {
	open("http://localhost:3000/spec/runner.html");
};

gulp.task(taskname, gulp.series(t("build"), openSpec));