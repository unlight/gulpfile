var path = require("path");
var dest = path.resolve(__dirname, "../build");
var config = {};

config.dest = dest;

config.bumpfiles = {
	src: ["package.json"],
	dest: "./"
};

config.less = {
	root: "src/design",
	src: "src/design/{style,srch-x-all}.less",
	dest: "build/design/css"
};

config.server = {
	root: [dest]
	watch: ["src/index.html", "src/*.js"]
};

config.vendors = [
	"angular"
];

module.exports = config;