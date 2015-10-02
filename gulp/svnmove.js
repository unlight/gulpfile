var path = require("path");
var format = require("formatstring");
var exec = require("child_process").exec;
var fs = require("fs");
var basename = require("basename");
var taskname = basename(__filename);

// Usage: gulp svnmove --source=..\Content_SearchV3\SearchV3.data\ThomsonReuters.SearchV3.Common\Usage --destination=ThomsonReuters.SearchV3.Common\Usage
gulp.task(taskname, function (done) {
	var sourcePath = g.util.env.source;
	var destinationPath = g.util.env.destination;
	if (!sourcePath || !destinationPath) {
		throw "source or destination is missing.";
	}
	// Find git repo from source path.
	var success = false;
	var dirname = sourcePath;
	var lastDirname;
	while (!success) {
		dirname = path.dirname(dirname);
		var gitDir = path.join(dirname, ".git");
		if (fs.existsSync(gitDir)) {
			success = true;
			break;
		}
		if (lastDirname === dirname) {
			break;
		}
		lastDirname = dirname;
	}
	if (!success) throw "Failed to find git repository.";
	var gitFilterArg = sourcePath.slice(dirname.length + 1).replace(/\\/g, "/");
	var output;
	output = execSync("git clone " + dirname + " tmp-repo");
	console.log(output.toString());
	// cd tmp-repo 
	process.chdir("tmp-repo");
	
	// git filter-branch
	output = execSync("git filter-branch --subdirectory-filter " + gitFilterArg + " -- --all");
	console.log(output.toString());
	
	// Make directory.
	output = execSync("mkdir " + destinationPath + "");
	console.log(output.toString());
	// Move files to directory.
	output = execSync("git mv -k *.* " + destinationPath.replace(/\\/g, "/") + "");
	console.log(output.toString());
	// Commit.
	output = execSync("git commit --message=\"Moved from svn\"");
	console.log(output.toString());
	// Cd ..
	process.chdir("..");
	
	// output = execSync("git checkout -b tmp-move");
	// console.log(output.toString());
	
	output = execSync("git remote add origin-tmp-repo tmp-repo");
	console.log(output.toString());

	output = execSync("git pull --no-edit --commit origin-tmp-repo master");
	console.log(output.toString());

	output = execSync("git remote rm origin-tmp-repo");
	console.log(output.toString());

	output = execSync("rm -rf tmp-repo");
	console.log(output.toString());

	done();
});