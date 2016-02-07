var streamCombiner = require("stream-combiner");
var config = require("./config");

var eslintp = function() {
	// http://eslint.org/docs/configuring/
	// http://eslint.org/docs/rules/
	var conf = {
		plugins: [
			"angular"
		],
		rules: {
			// Angular.
			"angular/di": [2, "function or array"],
			"angular/typecheck-array": 0,
			// Eslint.
			"no-use-before-define": [0, "nofunc"],
			"curly": 0,
			"comma-dangle": 1,
			"no-debugger": 1,
			"eol-last": 0,
			"new-cap": 1,
			"no-underscore-dangle": 0,
			"no-unused-vars": [2, {
				"vars": "all",
				"args": "none"
			}]
		},
		globals: {
			angular: true
		},
		envs: {
			browser: true,
			node: true
		}
	};
	// var merge = require("gulp-merge");
	var merge = require("merge2");
	var es = require('event-stream');

	var streamqueue = require('streamqueue');

	var r = streamqueue({ objectMode: true },
		g.eslint(conf),
		g.eslint.format(),
		g.if(config.production, g.eslint.failOnError())
	);
	return r;
	// return streamCombiner(
	// 	g.eslint(conf),
	// 	g.eslint.format(),
	// 	g.if(config.production, g.eslint.failOnError())
	// );
};

module.exports = eslintp;