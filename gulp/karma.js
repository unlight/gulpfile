var config = require("./config");

gulp.task("karma", function(done) {
	var Server = require("karma").Server;
	var options = Object.assign({}, defaults);
	new Server(options, done).start();
});

gulp.task("karma.watch", function(done) {
	var Server = require("karma").Server;
	var options = Object.assign({}, defaults, {
		singleRun: false,
		reporters: ["progress"]
	});
	new Server(options, done).start();
});

var defaults = {
	singleRun: true,
	files: [
		"build/js/vendors.js",
		"build/js/main.js",
		// "src/js/main.js",
		"src/js/**/*.spec.js",
		"spec/dummy.js"
	],
	exclude: [],
	autoWatch: true,
	plugins: [
		"karma-phantomjs-launcher",
		"karma-jasmine",
		"karma-browserify",
		"karma-junit-reporter",
		"karma-coverage"
	],
	frameworks: ["browserify", "jasmine"],
	reporters: ["progress", "junit", "coverage"],
	coverageReporter: {
		reporters: [{
			type: "html"
		}, {
			type: "text-summary"
		}]
	},
	junitReporter: {
		outputDir: "testresults",
		suite: "Unit Tests"
	},
	preprocessors: {
		"build/js/main.js": ["coverage"],
		"src/js/**/*.js": ["coverage"],
		// "src/js/**/*.js": ["browserify"],
	},
	browserify: {
		debug: true
	},
	// logLevel: "LOG_DEBUG",
	browsers: ["PhantomJS_custom"],
	customLaunchers: {
		"PhantomJS_custom": {
			base: "PhantomJS",
			options: {
				settings: {
					webSecurityEnabled: false
				},
			},
			flags: ["--load-images=false"],
			debug: false
		}
	}
};