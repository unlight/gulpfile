/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/gulp/gulp.d.ts" />
var gulp = require("gulp");
var g = require("gulp-load-plugins")();
var minimist = require("minimist");

var argv = minimist(process.argv.slice(2));
var task = argv._[0];
global.gulp = gulp;
global.g = g;
global.argv = argv;
global.t = function(name, needFile) {
	var parts = name.split(".");
	var firstPart = parts[0];
	require("./gulp/" + firstPart);
	if (needFile) {
		name = firstPart;
	}
	return name;
};
require("./gulp/" + t(task, true));