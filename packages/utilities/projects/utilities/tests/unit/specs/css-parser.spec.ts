import * as fs from 'node:fs';
import * as path from 'node:path';
import * as prettier from 'prettier';
import { jssGetFocusStyleTestCss, jssGetHoverStyleTestCss } from './jss-test';

const readGeneratedCss = (fileName: string) => {
  const cssFilePath = path.resolve(__dirname, `generated/${fileName}`);
  return fs.readFileSync(cssFilePath, 'utf-8');
};

const vanillaExtractGetFocusStyleTestCss = readGeneratedCss('vanilla-extract-getFocusStyle.css.ts.vanilla.css');
const vanillaExtractGetHoverStyleTestCss = readGeneratedCss('vanilla-extract-getHoverStyle.css.ts.vanilla.css');

it('should match compiled getFocusStyle() with jss (styles package)', () => {
  expect(jssGetFocusStyleTestCss).toMatchSnapshot();
});

it('should match compiled getHoverStyle() with jss (styles package)', () => {
  expect(jssGetHoverStyleTestCss).toMatchSnapshot();
});

it('should match compiled getFocusStyle() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetFocusStyleTestCss).toMatchSnapshot();
});

it('should match compiled getHoverStyle() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetHoverStyleTestCss).toMatchSnapshot();
});

it('should have equal compiled getFocusStyle() for jss and vanilla-extract', async () => {
  const veStyles = await prettier.format(vanillaExtractGetFocusStyleTestCss, { parser: 'css' });
  const jssStyles = await prettier.format(jssGetFocusStyleTestCss, { parser: 'css' });
  expect(veStyles).toStrictEqual(jssStyles);
});

it('should have equal compiled getHoverStyle() for jss and vanilla-extract', async () => {
  const veStyles = await prettier.format(vanillaExtractGetHoverStyleTestCss, { parser: 'css' });
  const jssStyles = await prettier.format(jssGetHoverStyleTestCss, { parser: 'css' });
  expect(veStyles).toStrictEqual(jssStyles);
});
