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

module.exports = config;