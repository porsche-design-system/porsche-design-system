import fs from 'fs';
import path from 'path';
import * as globby from 'globby';
import { npmDistTmpSubPath } from '../../../../components-js/projects/components-wrapper/environment';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

const buildDirectory = path.resolve('./build/static/js');
const [mainChunkFilePath] = globby.sync(`${buildDirectory}/main.*.chunk.js`);

const mainChunkFileContent = fs.readFileSync(mainChunkFilePath, 'utf8');

it('should only contain initial-styles partial', () => {
  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `"${x}"`)
    .join(',');
  // {50,70} & {10,20} quantifiers to increase accuracy of regex instead using .*
  const regex = new RegExp(`\\[${tagNames}\\].{50,70}\\.join\\(","\\)\\+"{visibility:hidden}".{10,20}"<style>"`);

  const withoutTagsMatches = mainChunkFileContent.match(/withoutTags/g);
  const formatHtmlMatches = mainChunkFileContent.match(/format:["']html["']/g);

  expect(mainChunkFileContent).toMatch(regex);
  expect(withoutTagsMatches.length).toBe(2);
  expect(formatHtmlMatches.length).toBe(1);
});
