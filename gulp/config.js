/* global argv */
var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {};

config.dest = dest;

config.bump = {
	src: ["package.json"],
	dest: "./"
};

config.design = {};
config.design.src = "src/design/style.less";
config.design.watch = "src/design/*.less";
config.design.dest = path.join(dest, "design/css");
config.design.root = "src/design";


// Client javascript.
config.scripts = {};
config.scripts.src = "src/scripts/**/*.ts"; // 1:1
config.scripts.watch = "src/scripts/**/*.js";
config.scripts.main = "src/scripts/main.js"; // Browserify entry point.
config.scripts.mainpath = "/js/main.js"; // Browserify middleware request path (starting with /) waiting fix https://github.com/AveVlad/gulp-connect/issues/138
config.scripts.dest = path.join(dest, "js");

// Server javascript.
config.sources = {};
config.sources.src = "src/js/**/*.js";
config.sources.watch = "src/js/**/*.js";

config.eslint = {};
config.eslint.src = "src/scripts/**/*.js";
config.eslint.watch = config.eslint.src;

config.htdocs = {};
config.htdocs.src = "src/scripts/index.html";
config.htdocs.watch = "src/scripts/index.html";
config.htdocs.dest = dest;

config.server = {
	port: 3000,
	root: [dest, ".", "./node_modules"],
	reload: []
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
		var result = !config.production;
		return result;
	}
});

Object.defineProperty(config, "cache", {
	get: function() {
		var result = argv.cache;
		return result;
	}
});

module.exports = config;