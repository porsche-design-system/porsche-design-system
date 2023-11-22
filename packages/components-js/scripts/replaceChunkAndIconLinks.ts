import * as fs from 'fs';
import * as path from 'path';
import { getComponentChunkLinks, getIconLinks } from '@porsche-design-system/components-js/partials';
import { COMPONENT_CHUNK_NAMES } from '../projects/components-wrapper';
import { ICON_NAMES } from '@porsche-design-system/assets';

export const chunksLink = getComponentChunkLinks({ components: [...COMPONENT_CHUNK_NAMES] }).replace(
  /https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g,
  'http://localhost:3001'
);

export const iconsLink = getIconLinks({ icons: [...ICON_NAMES] }).replace(
  /https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g,
  'http://localhost:3001'
);

const replaceChunkAndIconLinks = (): void => {
  const indexHtmlFilePath = path.resolve(__dirname, '../public/index.html');
  const oldContent = fs.readFileSync(indexHtmlFilePath, 'utf8');
  const newContent = oldContent
    .replace(/(<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_COMPONENT_CHUNKS-->)/, '$1' + chunksLink)
    .replace(/(<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_ICONS-->)/, '$1' + iconsLink);

  fs.writeFileSync(indexHtmlFilePath, newContent);
  console.log(`Replaced Component Chunk Links & Icon Links`);
};

replaceChunkAndIconLinks();
