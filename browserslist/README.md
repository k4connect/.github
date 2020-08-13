Browserlist Configurations
=============================

This is a collection of Browserlist configurations, depending on your particular use case.  To use them, just install the package(s) you want and then add the package(s) to your
`browserlist` configuration.  You can even just merge this into your `package.json`:

```json
{
	"browserslist": [ "extends @k4connect/browserslist-config-<env>" ]
}
```

The configurations are all set up so that there is support for development environments.  In your development environment, set your `BROWSERSLIST_ENV` to the value `"local"` (no quotes),
and you'll have a simpler, more modern configuration.
