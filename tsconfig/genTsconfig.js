"use strict";

const fs = require("fs");
const _ = require("lodash");

const OLDEST_NODE_LTS = 10;

const TSCONFIG_VERSIONS = {
  node4: {
    extends: "recommended",
    configOptions: {
      target: "ES3",
      downlevelIteration: true,
    },
  },
  node10: {
    extends: "node10",
  },
  node12: {
    extends: "node12",
  },
  rn: {
    extends: "react-native",
  },
};

const COMMON_CONFIG = {
  typeAcquisition: {
    enable: true,
  },
  compilerOptions: {
    checkJs: true,
    composite: true,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    inlineSources: true,
    importHelpers: true,
    isolatedModules: true,
    allowSyntheticDefaultImports: true,
    noImplicitReturns: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    allowUnreachableCode: false,
    importsNotUsedAsValues: "error",
    newLine: "lf",
    resolveJsonModule: true,
    useDefineForClassFields: true,
  },
  "$schema": "https://json.schemastore.org/tsconfig",
};

_.forEach(
  TSCONFIG_VERSIONS,
  (versionCfg, versionName) => fs.writeFileSync(
    `${versionName}.json`,
    JSON.stringify(_.merge({},
      COMMON_CONFIG,
      versionCfg, {
        display: versionName,
        extends: _.isEmpty(versionCfg.extends) ? null : `@tsconfig/${versionCfg.extends}/tsconfig.json`,
      },
    ), null, "\t")
  )
);

_.forEach(
  _.keys(TSCONFIG_VERSIONS),
  (versionName) => process.stdout.write(`${versionName}.json\n`)
);

fs.copyFileSync(`node${OLDEST_NODE_LTS}.json`, "node.json");
process.stdout.write("node.json\n");
