var path = require("path");
var format = require("formatstring");
var exec = require("child_process").exec;
var config = require("./config");

// usage: gulp publish --user=user@thomsonreuters.com --password=password --environment=Alpha
gulp.task("publish", function (done) {
	var info = {
		applicationPath: config.dest,
		user: argv.user,
		password: argv.password,
		environment: argv.environment || "Alpha"
	};
	var command = "C:\\EAE\\bin\\Publisher\\TR.AppServer.Publisher.exe -e {environment} -a WebApp -f {applicationPath} -u {user} -p {password}";
	command = format(command, info);
	var cmd = exec(command, done);
	cmd.stdout.pipe(process.stdout);
});