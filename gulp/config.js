var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {};

config.dest = dest;

config.design = {};
config.design.src = "src/design/*.less";
config.design.watch = "src/design/*.less";
config.design.dest = path.join(dest, "design");

// Client javascript.
config.scripts = {};
config.scripts.src = "src/js/**/*.js";
config.scripts.watch = "src/js/**/*.js";
config.scripts.main = "src/js/main.js"; // Browserify entry point.
config.scripts.dest = path.join(dest, "js");

// Server javascript.
config.sources = {};
config.sources.src = "src/js/**/*.js";
config.sources.watch = "src/js/**/*.js";

config.eslint = {};
config.eslint.src = "src/*.js";

config.htdocs = {};
config.htdocs.src = "src/index.html";
config.htdocs.watch = "src/index.html";
config.htdocs.dest = dest;

config.server = {
	port: 3000,
	root: [dest, ".", "./node_modules"]
};

config.vendors = [
	"angular"
];

Object.defineProperty(config, "production", {
	get: function() {
		var result = argv.production;
		if (typeof result === "undefined") {
			result = process.env.NODE_ENV === "production";
		}
		result = Boolean(result);
		return result;
	}
});

Object.defineProperty(config, "debug", {
	get: function() {
		result = !config.production;
		return result;
	}
});

module.exports = config;