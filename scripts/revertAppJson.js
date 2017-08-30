import path from 'path';
import fs from 'fs-extra';

const appJson = path.join(__dirname, '..', 'app.json');

if (fs.existsSync(`${appJson}.bak`)) {
  fs.removeSync(appJson);
  fs.moveSync(`${appJson}.bak`, appJson);
}
