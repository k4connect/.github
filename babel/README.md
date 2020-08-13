Babel Preset
===============

This is a shared configuration for Babel. It provides and configures a safe and useful collection of Babel presets and plugins.

Installation
===============

Install it:

```js
npm install --save-dev @k4connect/babel-preset
```

Then merge this into `package.json`:

```json
{
	"babel": {
		"presets": [ "@k4connect/babel-preset" ]
	}
}
```

If you want to do anything fancier, then check out [the Babel documentation on config files](https://babeljs.io/docs/en/config-files), and the questions at the bottom of this file.

Compatibility
=================

	* `undefined` becomes `void 0` to avoid the weird pre-`strict` case where `undefined` is defined, and also because it's shorter while being equally compressable.
	* generated EMCAScript compatibility is determined through [`babel-preset-env`](https://babeljs.io/docs/en/next/babel-preset-env.html), which uses [`browserslist`](https://www.npmjs.com/package/browserslist) to determine what compatibility level to use

Syntax Extensions
======================

Class Properties
------------------

When declaring a class, you can declare instance and static properties within the body of the class.

```js
class Foo {
	instanceProp1 = true
	instanceProp2 = false
	instanceBoundFunc = () => { return this.instanceProp1 }
	static staticProp1 = 0
}
```

Import / Export
--------------------

The following constructions now work, assuming you're using `import`/`export`.

```js
export m from "module";
export default from "module";
export * as m from "module";

```

Function Binding
--------------------

Avoid `bind`/`call`/`apply` with these handy shortcuts.

```js
const box = {
	weight: 2,
	getWeight() { return this.weight; },
};

const { getWeight } = box;

console.log(box.getWeight()); // prints '2'

const bigBox = { weight: 10 };
console.log(bigBox::getWeight()); // prints '10'

// Can be chained:
function add(val) { return this + val; }

console.log(bigBox::getWeight()::add(5)); // prints '15'
```

Operators
------------

The following ESNext operators work under this Babel config:

```js
a ||= b;  // a || (a = b)
a &&= b;  // a && (a = b)
a ?? b;   // a != null ? a : b
a?.b();   // a == null ? void 0 : a.b()
a?.b      // a == null ? void 0 : a.b
```


Non-Development Semantic Minification
========================================

Everything in this environment is only enabled if the `NODE_ENV` environment variable is defined and its value does not start with `"dev"`, `"test"`, or `"local"`.

Import Optimization
----------------------

Thanks to [`babel-plugin-lodash`](https://www.npmjs.com/package/babel-plugin-lodash), any use of Lodash is rewritten to directly
refer to the invoked functions, saving both the dereference and improving the effectiveness of tree shaking.

So this:

```js
import _ from 'lodash'
import { add } from 'lodash/fp'

const addOne = add(1)
_.map([1, 2, 3], addOne)
```

Becomes something like this:

```js
import _add from 'lodash/fp/add'
import _map from 'lodash/map'

const addOne = _add(1)
_map([1, 2, 3], addOne)
```

We also have installed the [`babel-plugin-transform-imports`](https://www.npmjs.com/package/babel-plugin-transform-imports),
but it's lacking in configuration.  That plugin lets you translate this:

```js
import { foo } from "module"
```

Into something like this:

```js
import foo from "module/some/path/foo"
```

However, we need to explain to the plugin how to perform that mapping.  If you have a module where you can reliably make that
translation, then please submit a PR adding it into the mix.

Other Baseline Optimizations
------------------------------
  * Constant folding
  * Simplification
  * Dead Code Elimination

Production Semantic Minification
========================================

Everything in this environment is only enabled if the `NODE_ENV` environment variable is defined and its value starts with "prod".

Logging Removal
------------------

Removes `console`, `debugger`, and `debug` calls.

Random Questions
===================

Why Not Just Use `babel-minify`?
----------------------------------

There's a really interesting and promising library called [`babel-preset-minify`](https://www.npmjs.com/package/babel-preset-minify), which is
attempting to implement semantic minification. That semantic minification is particularly useful if you are using advanced ECMAScript capabilities
and having Babel backport them.  Unfortunately, `babel-preset-minify` can barf in certain circumstances and it's pretty slow because of the sheer
number of plugins that it executes. So we pick an choose certain high-value plugins from that collection instead of using `babel-minify` completely.

Can I Modify These Choices?
------------------------------

Sure. Create a `.babelrc.js` file containing this:

```js
const _ = require("lodash");
const k4 = require("@k4connect/babel-config");

// Example modification: remove a plugin
const plugins = _.without(k4.plugins, "babel-plugin-transform-imports");

// Now export the updated configuration
module.exports = _.merge(
	{},
	k4,
	{ plugins }
);
```
