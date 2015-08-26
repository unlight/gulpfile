var streamCombiner = require("stream-combiner");
var config = require("./config");

var eslintp = function() {
	// http://eslint.org/docs/configuring/
	// http://eslint.org/docs/rules/
	var conf = {
		rules: {
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
	return streamCombiner(
		g.eslint(conf),
		g.eslint.format(),
		g.if(config.production, g.eslint.failOnError())
	);
};

module.exports = eslintp;