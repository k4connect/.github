/** @format */

const _ = require("lodash");
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV.startsWith("dev") || process.env.NODE_ENV.startsWith("test") || process.env.NODE_ENV.startsWith("local");
const isProduction = !isDev && process.env.NODE_ENV.startsWith("prod");

const presets = [
	[
		"@babel/preset-env",
		{
			loose: true,
			useBuiltIns: "usage",
			corejs: 3,
			shippedProposals: true,
		},
	],
];

const plugins = [
	"babel-plugin-transform-undefined-to-void",
	["@babel/plugin-proposal-class-properties", { loose: true }],
	"@babel/plugin-proposal-export-default-from",
	"@babel/plugin-proposal-export-namespace-from",
	"@babel/plugin-proposal-function-bind",
	"@babel/plugin-proposal-logical-assignment-operators",
	["@babel/plugin-proposal-nullish-coalescing-operator", { loose: true }],
	["@babel/plugin-proposal-optional-chaining", { loose: true }],
	"@babel/plugin-proposal-throw-expressions",
	"babel-plugin-transform-promise-to-bluebird",
];

// Everything that is run in test and production
if (!isDev) {
	// Presets are executed from last to first, so these go at the end
	// presets.unshift();

	// Plugins are executed from first to last, so these go at the end
	plugins.push(
		"babel-plugin-minify-constant-folding",
		"babel-plugin-minify-simplify",
		"babel-plugin-minify-dead-code-elimination",
		"babel-plugin-lodash", // This is specially-tuned to support modularizing Lodash imports.
		[
			// This is a more general-purpose way to modularize imports.
			// It's super useful for enabling tree shaking, assuming the imported library has a sane organization.
			"babel-plugin-transform-imports",
			{},
		],
	);
}

// Things specifically for the production environment
if(isProduction) {
	// Plugins are executed from first to last, so these go up front
	plugins.unshift(
		"babel-plugin-remove-debug",
		"babel-plugin-transform-remove-debugger",
		"babel-plugin-transform-remove-console",
	);
}

module.exports = (api) => {
	_.isFunction(api.assertVersion) && api.assertVersion("^7");
	api.cache && _.isFunction(api.cache.invalidate) && api.cache.invalidate(
		() => {
			if(_.isFunction(api.env)) {
				return api.env();
			} else {
				return process.env.NODE_ENV;
			}
		}
	);
	return {
		presets,
		plugins,
		sourceMaps: true,
		retainLines: isDev,
		compact: isProduction,
		minified: isProduction,
		comments: isDev
	};
};
