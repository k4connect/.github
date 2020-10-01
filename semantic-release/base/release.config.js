module.exports = {
	branches: [
		"+([0-9])?(.{+([0-9]),x}).x",   // Branches named "N.x.x" or "N.N.x" (where "N" is a natural number)
		"master",
		{ name: "development", prerelease: "rc" },
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/git',
			{ "message": "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}" }
		],
		'@semantic-release/github',
	],

	preset: "conventionalcommits",
	presetConfig: {
		types: [
			{"type": "feat", "section": "Features"},
			{"type": "fix", "section": "Bug Fixes"},
			{"type": "chore", "hidden": true},
			{"type": "docs", "section": "Documentation Changes"},
			{"type": "style", "hidden": true},
			{"type": "refactor", "hidden": true},
			{"type": "perf", "section": "Performance Improvements"},
			{"type": "test", "hidden": true},
			{"type": "ci", "hidden": true},
			{"type": "build", "hidden": true},
			{"type": "release", "hidden": true},
		],
		releaseCommitMessageFormat: "release({{currentTag}}): {{hash}}",
		issuePrefixes: [ // TODO Read these out of Jira's API
			"DEMO-",
			"K4ADV-",
			"K4CAR-",
			"K4CLOUD-",
			"K4EDGE-",
			"K4ENT-",
			"K4OPSV1-",
			"K4PIL-",
			"K4SAND-",
			"K4UX-",
			"K4VOICE-",
			"K4WEB-",
		],
		issueUrlFormat: "https://k4connect.atlassian.net/browse/{{id}}"
	},

	// The following release rules are in addition to the reasonable defaults:
	//   https://github.com/semantic-release/commit-analyzer/blob/HEAD/lib/default-release-rules.js
	releaseRules: [
		{ type: "refactor", release: "patch" },
	],

	parserOpts: {
		// Have the parser handle GitHub pull request merges.
		mergePattern: /^Merge pull request #(\d+) from (.*)$/,
		mergeCorrespondence: ['id', 'source'],
	},

	host: "https://github.com",

	assets: [
		"*.md",
		"package.json",
		"package-lock.json",
		"dist/**/*",
		"docs/**",
	],

};
