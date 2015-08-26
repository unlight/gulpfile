var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);
var browserifyMiddleware = require("browserify-middleware");

gulp.task(taskname, function() {
	var serverRoot = config.server.root;
	if (config.production) serverRoot = config.dest;
	g.connect.server({
		root: serverRoot,
		port: config.server.port || 3000,
		livereload: true,
		middleware: function(connect, opt) {
			if (config.production) {
				return [];
			}
			var browserifyHandler = browserifyMiddleware(config.scripts.main);
			var browserifyMd = function(req, res, next) {
				var pathname = req._parsedUrl.pathname;
				if (pathname === config.scripts.mainpath) {
					browserifyHandler(req, res, next);
					return;
				}
				next();
			};
			return [
				browserifyMd
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