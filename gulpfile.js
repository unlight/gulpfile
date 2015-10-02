/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/gulp/gulp.d.ts" />
var gulp = require("gulp");
var g = require("gulp-load-plugins")();
var task = g.util.env._[0];

global.gulp = gulp;
global.g = g;
global.t = function(name, isMain) {
	var parts = name.split(".");
	var firstPart = parts[0];
	require("./gulp/" + firstPart);
	if (isMain) {
		name = firstPart;
	}
	return name;
};
require("./gulp/" + t(task, true));