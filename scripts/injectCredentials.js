import path from 'path';
import fs from 'fs-extra';
import injectEnv from 'inject-env';

const appRoot = path.join(__dirname, '..');
const appSrc = path.join(appRoot, 'src');
const appCredentials = path.join(appSrc, 'credential');
const appJson = path.join(appRoot, 'app.json');

fs
  .readdirSync(appCredentials)
  .filter(f => f.endsWith('.json'))
  .map(f => fs.readJSONSync(path.join(appCredentials, f)))
  .forEach(credential => Object.assign(process.env, credential));

if (!fs.existsSync(`${appJson}.bak`)) {
  fs.copySync(appJson, `${appJson}.bak`);

  fs.writeJSONSync(
    appJson,
    JSON.parse(injectEnv(fs.readFileSync(appJson, 'utf-8'))),
    {
      spaces: 2,
    }
  );
}
