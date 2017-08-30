import path from 'path';
import fs from 'fs-extra';
import git from 'simple-git';

const appRoot = path.join(__dirname, '..');
const appJson = path.join(appRoot, 'app.json');

if (fs.existsSync(`${appJson}.bak`)) {
  fs.removeSync(appJson);
  fs.moveSync(`${appJson}.bak`, appJson);
}

git(appRoot).add(['app.json']);
