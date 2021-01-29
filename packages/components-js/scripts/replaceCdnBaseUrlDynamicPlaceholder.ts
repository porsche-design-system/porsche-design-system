import * as fs from 'fs';
import * as path from 'path';
import globby from 'globby';
import { CDN_BASE_URL_DYNAMIC } from '../../../cdn.config';

const readAndWriteFile = (targetFile: string): void => {
  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = oldContent.replace(
    '"%%%CDN_BASE_URL_DYNAMIC%%%',
    `${CDN_BASE_URL_DYNAMIC.replace(/\s/g, '') // strip spaces
      .replace('typeof', 'typeof ')}+"` // recover space after typeof
  );
  fs.writeFileSync(targetFile, newContent);
  console.log(`Updated: ${targetFile}`);
};

const replaceCdnBaseUrlDynamicPlaceholder = async () => {
  readAndWriteFile(path.normalize('./dist/components-wrapper/index.js')); // core loader
  readAndWriteFile(path.normalize((await globby('./dist/components/porsche-design-system.v*'))[0])); // core on cdn

  console.log(`Replaced: "%%%CDN_BASE_URL_DYNAMIC%%%" –> "${CDN_BASE_URL_DYNAMIC}"`);
};

(async (): Promise<void> => {
  await replaceCdnBaseUrlDynamicPlaceholder().catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
