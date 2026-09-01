import * as fs from 'node:fs';
import * as path from 'node:path';
import * as globby from 'fast-glob';
import type { BreakpointValue, BreakpointValues } from './breakpoint-customizable';
import { isTruthyForAnyBreakpoint, parseJSON } from './breakpoint-customizable';

describe('parseJSON()', () => {
  it.each<
    [
      string | boolean | number | { base: string },
      BreakpointValues<BreakpointValue> | boolean | number | { base: string },
    ]
  >([
    ['{base: true, s: false}', { base: true, s: false }],
    ["{base: 'initial', l: 'equal'}", { base: 'initial', l: 'equal' }],
    ['{base: "initial", l: "equal"}', { base: 'initial', l: 'equal' }],
    ['{"base": "right", "s": "left"}', { base: 'right', s: 'left' }],
    ['{base: "https://porsche.com"}', { base: 'https://porsche.com' }],
    ['{base: 36, xs: 6, s: 4, m: 16, l: 2}', { base: 36, xs: 6, s: 4, m: 16, l: 2 }],
    [
      '{base: "1:1", s: "3:4", m: "4:3", l: "9:16", xl: "16:9", xxl: "3:4"}',
      { base: '1:1', s: '3:4', m: '4:3', l: '9:16', xl: '16:9', xxl: '3:4' },
    ],
    [false, false],
    [1, 1],
    [{ base: 'initial' }, { base: 'initial' }],
    // HTML boolean attribute shorthand, e.g. <p-input-text hide-label>
    ['', true],
  ])('should for %s return %s', (input, result) => {
    expect(parseJSON(input)).toStrictEqual(result);
  });
});

describe('isTruthyForAnyBreakpoint()', () => {
  it.each<[boolean | string | BreakpointValues<boolean>, boolean]>([
    [true, true],
    [false, false],
    ['true', true],
    ['false', false],
    ['', true], // HTML boolean attribute shorthand
    [{ base: true }, true],
    [{ base: false }, false],
    [{ base: false, l: true }, true],
    ['{base: false, l: true}', true],
    ['{base: false, l: false}', false],
  ])('should for %s return %s', (input, result) => {
    expect(isTruthyForAnyBreakpoint(input)).toBe(result);
  });
});

describe('BreakpointCustomizable types', () => {
  const srcDirectory = path.resolve(__dirname, '..');
  // utils files should be good enough
  const filePaths = globby.sync(`${srcDirectory}/**/*-utils.ts`);

  it.each(
    filePaths.map((filePath) => [filePath.replace(srcDirectory, ''), filePath])
  )('should not define BreakpointCustomizable alias type in %s', (_, filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).not.toContain('= BreakpointCustomizable');
  });
});
