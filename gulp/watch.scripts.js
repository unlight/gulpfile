var config = require("./config");
var util = require("./util");
var lessp = require("./lessp");
var basename = require("basename");
var taskname = basename(__filename);

require("./build.scripts");

gulp.task(taskname, function() {
	var w = gulp.watch(config.scripts.watch, gulp.series("build.scripts"));
	w.on("change", g.memoryCache.update("scripts"));
});