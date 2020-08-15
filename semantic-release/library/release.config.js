const _ = require("lodash");
const baseConfig = require("@k4connect/semantic-release-config-base");

module.exports = _.merge(
	{},
	baseConfig, // Want the properties promoted to the top level
	{
		plugins: [ "@semantic-release/npm" ],
		npmPublish: true,
	}
);
