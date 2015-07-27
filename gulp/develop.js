var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, gulp.parallel(""));