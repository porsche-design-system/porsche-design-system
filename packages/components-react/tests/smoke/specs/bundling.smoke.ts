import fs from 'fs';
import path from 'path';
import * as globby from 'globby';
import { INTERNAL_TAG_NAMES, TAG_NAMES, SKELETON_TAG_NAMES } from '@porsche-design-system/shared';

const buildDirectory = path.resolve('./build/static/js');
const [mainChunkFilePath] = globby.sync(`${buildDirectory}/main.*.js`);

const mainChunkFileContent = fs.readFileSync(mainChunkFilePath, 'utf8');

it('should only contain initial-styles partial', () => {
  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `"${x}"`)
    .join(',');
  const tagNamesWithSkeleton = SKELETON_TAG_NAMES.map((x) => `"${x}"`).join(',');
  // quantifiers ({start, end}) to increase accuracy of regex instead using .*
  const regex = new RegExp(
    `\\[${tagNames}\\].{0,10}\\[${tagNamesWithSkeleton}\\].{140,160}\\.join\\(", "\\)\\,.{50,70}\\.join\\(", "\\)\\)\\).{180,200}\\.join\\(","\\)\\+"{visibility:hidden}".{120,140}"<style".{20,40}"</style>"`
  );

  expect(mainChunkFileContent).toMatch(regex);

  const withoutTagsMatches = mainChunkFileContent.match(/withoutTags/g);
  const formatHtmlMatches = mainChunkFileContent.match(/format:["']html["']/g);
  const skeletonTagNamesMatches = mainChunkFileContent.match(/skeletonTagNames/g);

  expect(withoutTagsMatches.length).toBe(2);
  expect(formatHtmlMatches.length).toBe(1);
  expect(skeletonTagNamesMatches.length).toBe(3);
});
