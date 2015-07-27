var config = require("./config");
var util = require("./util");
var basename = require("basename");
var taskname = basename(__filename);

// Copy public files to destionation.
gulp.task(taskname, function() {
	var options = {
		ignoreInitial: false,
		verbose: false
	};

});