var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {
	paths: {},
	html: {},
};

config.paths.js = path.join(dest, "js");

config.dest = dest;

config.eslint = {
	src: "src/*.js"
};

config.clientjs = {
	src: "src/*.js",
	main: "src/app.js",
	dest: config.paths.js
};

config.serverjs = {
	src: "server/*.js"
};

config.html.src = "src/index.html";

config.server = {
	port: 3000,
	root: [dest, ".", "./node_modules"],
	reload: [
		config.html.src
	]
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