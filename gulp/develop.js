/* global gulp */
/* global t */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);

gulp.task(taskname, gulp.series([
	t("clean"),
	t("build"),
	gulp.parallel(
		t("scripts.watch"),
		t("eslint.watch"),
		t("design.watch"),
		t("htdocs.watch"),
		t("server")
	)
]));