var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyMiddleware = require("browserify-middleware");

gulp.task(taskname, function() {
	g.connect.server({
		root: config.server.root,
		port: config.server.port || 3000,
		livereload: true,
		middleware: function(connect, opt) {
			var browserifyHandler = browserifyMiddleware(config.scripts.main);
			return [
				function(req, res, next) {
					var pathname = req._parsedUrl.pathname;
					if (pathname === config.scripts.mainpath) {
						browserifyHandler(req, res, next);
						return;
					}
					next();
				}
			]
		}
	});

	g.watch(config.server.reload, {
		ignoreInitial: true,
		verbose: false
	}, g.batch(function(events, done) {
		events.on("data", util.niceRelativePath);
		events.pipe(g.connect.reload());
		events.on("end", done);
	}));
});