Prettier Config
=================

This provides the basic [Prettier](https://prettier.io/docs/en/index.html) configuration for use at K4.

Usage
========

First, install the exact latest version as a dev dependency:

```bash
npm --save-dev --save-exact @k4connect/prettier-config
```

Then, add the following key and value to your `package.json`:

```json
{ "prettier": "@k4connect/prettier-config" }
```

And that's it!  You're ready to use Prettier with our standard configuration.  For more details about how to do that, keep reading.

Overriding Values
-------------------

If you want to override values, then _don't_ add the `"prettier"` key into `package.json` as before. Instead, create a sibling file to `package.json` named `.prettierrc.js`.
The template for it follows:

```js
"use strict";

const overrides = {
	// Insert your overrides here
};

module.exports = {
	...require("@k4connect/prettier-config"),
	...overrides,
};
```

The entries for `overrides` should be [configuration options from Prettier](https://prettier.io/docs/en/options.html).

Integrating Prettier
======================

IDEs
------

For information on integrating with IDEs, see [Prettier's documentation on editor integrations](https://prettier.io/docs/en/editors.html).

Adoption
---------

If you have a repo that you're starting from scratch, then just follow the instructions above, and you're good to go.
If you have an existing repo that you want to integrate Prettier with, then follow the instructions above, and afterwards I highly suggest
doing a one-and-done update of the whole repo on a clean fork of your default branch:

```bash
git checkout development
git checkout -b apply-prettier
npx prettier --write .
git add .
git commit -m "Cleaned up the code with Prettier"
git push -u origin apply-prettier
```

Note that commits on other branches will not have pull requests if the changed files have been run through `prettier`, such as through editor integration, project configuration,
or GitHub Action.  (See below if you do want GitHub Action integration: the instructions get a lot simpler.)

JS Projects
--------------

If you have a JavaScript-based project, you can use [`husky`](https://www.npmjs.com/package/husky) and
[`lint-staged`](https://www.npmjs.com/package/lint-staged) to automatically apply `prettier`. This is all automatically set up with the following two commands:

```bash
npm install --save-dev prettier
npx mrm lint-staged
```

GitHub Actions
------------------

The annoying part about the project-based integration is that it slows down normal `git` activities, which can get annoying in a hurry.  Preferable is a GitHub Action that will
run in the cloud when code pushed.  For such a GitHub Action, see 'workflow-templates/prettier.yml' in this repository.  To integrate it into your project, just copy the file to
`.github/workflows/prettier.yml` in your directory.  GitHub will now run `prettier` and commit back any changes whenever you create a tag or a branch in the GitHub repo, and also
whenever you move pull requests into an "Ready" state.

Note that once you've got this GitHub Action integrated, then you can do the "Adoption" instructions by simply doing this:

```bash
git push -u origin development:apply-prettier
```

Then create a PR for the new `apply-prettier` branch back to your default branch, and the branch should include the post-`prettier` files!
