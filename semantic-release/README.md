Semantic Release Shared Configurations
========================================

The [`semantic-release`](https://semantic-release.gitbook.io/semantic-release/) project is freaking amazing, because it automates release processes in all the right ways. This folder contains
the shared configurations that make it easy for you to adopt.

Project Types
----------------

There are (as of this writing) three project types to choose from:

	* *base* - This is the minimal project type, which does the basic behaviors that we always want.
		* Kicks off a master release on every push to the `master` branch, or for any branch named `N.N.x` or `N.x.x` (where "N" is a natural number).
		* Kicks off an `rc` prerelease on every push to the `development` branch.
		* Analyzes the new commits for each release based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), and calculates the new version number for the relase (if any) based on the commit types.
		* Generates release notes and updates the changelog.
		* Commits the release assets and tags the release in git.
		* Publishes the release as a [GitHub Release](https://docs.github.com/en/github/administering-a-repository/about-releases) for ease of reference.
		* Updates the labels on issues and PRs that are impacted by this release.

	* *library* - This is the project type for an NPM package.  It does everything the *base* project type does, and additionally:
		* Publishes the project to the NPM repo

	* *service* - This is the project type for a service. It does everything the *base* project type does. In the future, it will kick off builds in Jenkins, push to ECR and tag it, and/or notify Slack.


Conventional Commits
-----------------------

All of this awesomeness is enabled by using commit formats of a particular format.  Any message not in this format will be ignored; any message in this format will become a part of the
version bump configuration, as well as being written into the changelog and release notes.  The format is called [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary),
and is derived from the convention adopted by various open source projects.

My suggestion is to use [`commitizen`](https://www.npmjs.com/package/commitizen), which walks you through the necessary steps at commit-time.  To set up a repo to support Commitizen,
you need to run the following at the root of your repo:

```bash
npm install --save-dev husky
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

Then merge the following into your `package.json`:

```json
{
	"husky": {
		"hooks": {
			"prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
		}
	}
}
```

Now everyone who does a `git commit` will be run through `commitizen`.

Usage
=========

First, install the desired environment as a dev dependency:

```bash
npm install --save-dev semantic-release @k4connect/semantic-release-config-<type>  # substitute your project type for <type>
```

Then, merge the following into your `package.json`:

```json
{
	"release": {
		"extends": [ "@k4connect/semantic-release-config-<type>" ]
	}
}
```

Boom. You can now do `npx semantic-release --dry-run` to see what it would do.

To get `semantic-release` to actually run and do something, use the GitHub Action in this repo at `/workspace-templates/semantic-release.yml`.
