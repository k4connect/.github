This is a plugin that adds Typescript support to ESLint.  It's a thin wrapper around [`eslint-config-airbnb-typescript`](https://github.com/davidjbradshaw/eslint-config-airbnb-typescript)
and [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).

Note that you will need to modify ESLint to process `.ts(x)?` files, as well:

```bash
eslint --ext .js,.jsx,.ts,.tsx ./
```
