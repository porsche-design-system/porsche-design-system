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
  // Remove whitespace in media query
  const styles = vanillaExtractTestCss.replace(/(@media) (\(hover:hover\))/, '$1$2');
  // JSS adds newline at the end
  expect(styles + '\n').toStrictEqual(jssTestCss);
});
