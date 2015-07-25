var streamCombiner = require("stream-combiner");

var eslintp = function() {
	// http://eslint.org/docs/configuring/
	// http://eslint.org/docs/rules/
	var conf = {
		rules: {
			"no-use-before-define": [0, "nofunc"],
			"curly": 0,
			"no-comma-dangle": 1,
			"no-debugger": 1,
			"eol-last": 0,
			"new-cap": 1,
			"no-underscore-dangle": 0
		},
		globals: {
			angular: true
		},
		env: {
			browser: true,
			node: true
		}
	};
	return streamCombiner(
		g.eslint(conf),
		g.eslint.formatEach("stylish", process.stdout)
	);
};

module.exports = eslintp;