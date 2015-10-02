var http = require("http");
var config = require("./config");
var config = require("./config");
var basename = require("basename");
var taskname = basename(__filename);
var open = require("open");
var format = require("formatstring");
var path = require("path");

gulp.task(taskname, function (done) {
	var applicationPath = path.resolve(__dirname, config.dest);
	var url = "http://localhost:10029/AppEngine/Import?path=" + applicationPath;
	http.get(url, function (response) {
		var app;
		response.on("data", function (chunk) {
			app = JSON.parse(chunk.toString());
			g.util.log("Imported application", g.util.colors.yellow(app.name), "version", g.util.colors.green(app.version));
		});
		response.on("end", function() {
			if (g.util.env.o === true) {
				var opencmd = format("http://localhost:10030/Apps/{name}/{version}", app);
				open(opencmd);
			}
			done();
		});
	});
});