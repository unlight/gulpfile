/* global gulp */
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyp = require("./browserifyp");

require("./build.scripts");
require("./build.design");

gulp.task(taskname, gulp.series(
	gulp.parallel("build.design", "build.scripts"),
	function() {
		var production = config.production;
		return gulp.src(config.htdocs.src)
			.pipe(g.usemin({
				vendorsjs: ["concat", g.if(config.production, g.uglify())],
				js: [browserifyp(), "concat", g.if(config.production, g.uglify())],
				css: ["concat", g.if(config.production, g.csso())]
			}))
			.pipe(gulp.dest(config.htdocs.dest));
	}));