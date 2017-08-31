import path from 'path';
import fs from 'fs-extra';
import injectEnv from 'inject-env';

const appRoot = path.join(__dirname, '..');
const appPackageJson = path.join(appRoot, 'package.json');
const appSrc = path.join(appRoot, 'src');
const appCredentials = path.join(appSrc, 'credential');
const appJson = path.join(appRoot, 'app.json');
const appJsonBackup = `${appJson}.bak`;

process.env.buildNumber = fs
  .readJSONSync(appPackageJson)
  .version.split('.')
  .map((n, i) => ({ n, i }))
  .reduce((a, { n, i }) => {
    return a + Math.pow(100, 2 - i) * n;
  }, 0);

fs
  .readdirSync(appCredentials)
  .filter(f => f.endsWith('.json'))
  .map(f => fs.readJSONSync(path.join(appCredentials, f)))
  .forEach(credential => Object.assign(process.env, credential));

if (fs.existsSync(appJsonBackup)) {
  fs.removeSync(appJson);
  fs.copySync(appJsonBackup, appJson);
} else {
  fs.copySync(appJson, appJsonBackup);
}

const appJsonData = fs
  .readFileSync(appJson, 'utf-8')
  .replace('"${buildNumberInteger}"', '${buildNumber}');
fs.writeJSONSync(appJson, JSON.parse(injectEnv(appJsonData)), {
  spaces: 2,
});
