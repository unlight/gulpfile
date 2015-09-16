/* global gulp */
/* global t */
/// <reference path="../typings/gulp/gulp.d.ts"/>
var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var open = require("open");

gulp.task(taskname, gulp.series([
	t("clean"),
	t("build"),
	gulp.parallel(
		t("scripts.watch"),
		t("design.watch"),
		t("htdocs.watch"),
		t("eslint.watch"),
		t("server"),
		function() {
			open("http://localhost:3000");
		}
	)
]));