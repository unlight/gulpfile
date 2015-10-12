exports.niceRelativePath = function(file) {
	var niceRelativePath = file;
	if (file.path && file.cwd) { // vinyl file
		niceRelativePath = file.path.slice(file.cwd.length + 1);	
	}
	g.util.log(g.util.colors.magenta(niceRelativePath), "was changed");
};

// Adapter g.wtach.on("change") update cache name for gulp.watch.on("change")
exports.memoryCacheChange = function(name) {
	return function(path) {
		var update = g.memoryCache.update(name);
		update({
			path: path,
			type: "changed"
		});
	};
};

exports.memoryCacheUnlink = function(name) {
	return function(path) {
		var update = g.memoryCache.update(name);
		update({
			path: path,
			type: "deleted"
		});
	};
};

exports.memoryCacheAdd = function(name) {
	return function(path) {
		var update = g.memoryCache.update(name);
		update({
			path: path,
			type: "added"
		});
	};
};