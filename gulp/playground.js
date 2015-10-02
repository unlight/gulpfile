var basename = require("basename");
var taskname = basename(__filename);
var lessp = require("./lessp");

var conf =  {
	extensionsList: ['less']
}

gulp.task("playground.less", function() {
	gulp.src("playground/**/*.less")
		.pipe(g.cached("less"))
		// .pipe(g.debug())
		.pipe(g.progeny(conf))
		// .pipe(g.debug())
		.pipe(g.less())
		// .pipe(g.debug())
		.pipe(gulp.dest("dist"))
});


gulp.task("playground.watch", function() {
	gulp.watch("playground/**/*.less", gulp.series("playground.less"));
});