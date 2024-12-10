import * as fs from 'node:fs';
import * as path from 'node:path';
import { jssTestCss } from './jss-test';

const cssFilePath = path.resolve(__dirname, 'generated/vanilla-extract.css');
const vanillaExtractTestCss = fs.readFileSync(cssFilePath, 'utf-8');

it('should match compiled styles with jss (styles package)', () => {
  expect(jssTestCss).toMatchSnapshot();
});

it('should match compiled styles with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractTestCss).toMatchSnapshot();
});

it('should have equal compiled css for jss and vanilla-extract', () => {
  // JSS adds newline at the end
  expect(vanillaExtractTestCss + '\n').toStrictEqual(jssTestCss);
});
