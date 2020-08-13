It is Dangerous to Go Alone!  Take This.
===========================================

These folders contain the shared ESLint configurations for projects in various environments.

Usage
======

With the exception of the `base` folder, each of these folders are an NPM package of the name `@k4connect/eslint-config-<env>`.

To use one (or more) of them, first save the plugin as a dependency:

```bash
npm install --save-dev @k4connect/eslint-config-<env>
```

If you don't have [an ESLint config file](https://eslint.org/docs/user-guide/configuring) yet, then run this command to create one:

```
npx eslint --init
```

In the newly-generated ESLint configuration file, make sure the `"extends"` field is an array: if it's a string, just wrap it in an array. Now
add to that array the value: `@k4connect/eslint-config-<env>`.

Done.

Oh, but note that can use multiple environments if you want: add all the ones appropriate for your environment.

Base Config
--------------

If none of the environments work for you, you can use just the base config. This will leave most of the ESLint configuration to you.

To use the base config, first install the base config:

```bash
npm install --save-dev @k4connect/eslint-config
```

Then simply add `@k4connect` (yes, without the `/eslint-config` package name) to the `"extends"` array as above.

Integration
=================

The first place to look for ESLint integration instructions is [the ESLint documentation on integrations](https://eslint.org/docs/user-guide/integrations).
There's also a lot of interesting stuff in the [`@dustinspecker/awesome-eslint`](https://github.com/dustinspecker/awesome-eslint) repo on GitHub.  (I'm
assuming that author's name is "@DustinSpecker".)

JavaScript Project
---------------------

The simplest way to get ESLint running in your JavaScript project is to run:

```bash
npx mrm eslint
```

Then update the config as described in "Usage" above.


GitHub Action
-----------------

Using a GitHub Action for applying ESLint allows you to ensure that your code is kept clean in the remote, without requiring/depending on people running
it locally before they push.  The workflow implementing this is in this repo at `workflow-template/eslint-fix-and-check.yml`.

Adoption
---------------

Adoptinmg ESLint into an existing project can be a PITA.  While you're slowly whittling down the errors, I'd suggest that you use the
[`only-warn` plugin](https://github.com/bfanger/eslint-plugin-only-warn) to prevent things from failing.
