var config = require("./config");

gulp.task("clean", function (done) {
	var del = require("del");
	del([config.dest + "/*"], done);
});