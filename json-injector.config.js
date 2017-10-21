const path = require('path');
const fs = require('fs-extra');
const fileInjector = require('json-injector/lib/injectors/file');

module.exports = {
  files: ['app'],
  postInject: {
    'expo.android.versionCode': v => +v,
  },
  injectors: [
    fileInjector({
      patterns: ['src/credential/*.json'],
    }),
    () => ({
      buildNumber: fs
        .readJSONSync(path.resolve(__dirname, 'package.json'))
        .version.split('.')
        .map((n, i) => ({ n, i }))
        .reduce((a, { n, i }) => a + Math.pow(100, 2 - i) * n, 0),
    }),
  ],
};
