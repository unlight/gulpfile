var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {};

config.dest = dest;

config.bump = {
	src: ["package.json"],
	dest: "./"
};

config.design = {};
config.design.src = "src/design/custom.css";
config.design.watch = config.design.src;
config.design.dest = path.join(dest, "design", "css");
config.design.root = "src/design";

// Client javascript.
config.scripts = {};
config.scripts.src = "src/**/*.js";
config.scripts.watch = config.scripts.src;
config.scripts.main = "src/js/main.js"; // Browserify entry point.
config.scripts.mainpath = "/js/main.js"; // Browserify middleware request path (starting with /) waiting fix https://github.com/AveVlad/gulp-connect/issues/138
config.scripts.dest = path.join(dest, "js");

// Server javascript.
config.sources = {};
config.sources.src = ["src/ts/**/*.ts"];
config.sources.watch = config.sources.src;

config.eslint = {};
config.eslint.src = config.scripts.src;
config.eslint.watch = config.scripts.watch;

config.htdocs = {};
config.htdocs.src = ["src/**/*.html"];
config.htdocs.watch = config.htdocs.src;
config.htdocs.dest = dest;

config.server = {
	port: 3000,
	root: [dest, "./src", "./node_modules", "."],
	reload: []
};

config.vendors = [
	"angular",
	"angular-route",
	"angular-resource",
	"angular-ui-bootstrap",
	"angular-mocks/ngMockE2E",
	"angular-local-storage/dist/angular-local-storage"
];

Object.defineProperty(config, "production", {
	get: function() {
		var result = g.util.env.production;
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
		var result = g.util.env.cache;
		return result;
	}
});

module.exports = config;