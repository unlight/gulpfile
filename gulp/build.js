/* global t */
/* global gulp */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, gulp.series(
	t("clean"),
	t("htdocs.build")
));