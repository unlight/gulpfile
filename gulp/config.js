var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {};

config.dest = dest;

config.eslint = {
	src: "src/*.js"
};

config.clientjs = {
	src: "src/*.js"
};

config.serverjs = {
	src: "server/*.js"
};

config.server = {
	port: 3000,
	root: [dest],
	reload: [
		"src/index.html"
	]
};

config.vendors = [
	"angular"
];

module.exports = config;