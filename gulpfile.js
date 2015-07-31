/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/gulp/gulp.d.ts" />
var gulp = require("gulp");
var g = require("gulp-load-plugins")();
var minimist = require("minimist");

var argv = minimist(process.argv.slice(2));
var taskname = argv._[0];
global.gulp = gulp;
global.g = g;
global.argv = argv;
global.t = function(task) {
	require("./gulp/" + task);
	return task;
};
require("./gulp/" + taskname);