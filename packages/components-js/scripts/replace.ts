import * as fs from 'fs';
import * as path from 'path';
import { CDN_BASE_URL_DYNAMIC, CDN_KEY } from '../../../cdn.config';

const replaceCdnBaseUrlDynamicPlaceholder = async () => {
  const targetFile = path.normalize('./dist/components-wrapper/index.js');

  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = oldContent.replace(
    '"%%%CDN_BASE_URL_DYNAMIC%%%',
    `${CDN_BASE_URL_DYNAMIC.replace('CDN_KEY', `'${CDN_KEY}'`) // replace variable with actual value
      .replace(/\s/g, '') // strip spaces
      .replace('typeof', 'typeof ')}+"` // recover space after typeof
  );

  console.log(`Replaced "%%%CDN_BASE_URL_DYNAMIC%%%" with "${CDN_BASE_URL_DYNAMIC}"`);

  fs.writeFileSync(targetFile, newContent);
};

(async (): Promise<void> => {
  await replaceCdnBaseUrlDynamicPlaceholder().catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
