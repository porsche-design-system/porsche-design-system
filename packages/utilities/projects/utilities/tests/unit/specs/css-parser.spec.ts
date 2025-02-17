import * as fs from 'node:fs';
import * as path from 'node:path';
import * as prettier from 'prettier';
import {
  jssGetFocusStyleTestCss,
  jssGetHoverStyleTestCss,
  jssGetMediaQueryMax,
  jssGetMediaQueryMin,
  jssGetMediaQueryMinMax,
} from './jss-test';
import { vanillaExtractGetMediaQueryMax } from './vanilla-extract-getMediaQueryMax.css';
import { vanillaExtractGetMediaQueryMin } from './vanilla-extract-getMediaQueryMin.css';
import { vanillaExtractGetMediaQueryMinMax } from './vanilla-extract-getMediaQueryMinMax.css';

const readGeneratedCss = (fileName: string) => {
  const cssFilePath = path.resolve(__dirname, `generated/${fileName}`);
  return fs.readFileSync(cssFilePath, 'utf-8');
};

const vanillaExtractGetFocusStyleTestCss = readGeneratedCss('vanilla-extract-getFocusStyle.css.ts.vanilla.css');
const vanillaExtractGetHoverStyleTestCss = readGeneratedCss('vanilla-extract-getHoverStyle.css.ts.vanilla.css');
const vanillaExtractGetMediaQueryMaxTestCss = readGeneratedCss('vanilla-extract-getMediaQueryMax.css.ts.vanilla.css');
const vanillaExtractGetMediaQueryMinTestCss = readGeneratedCss('vanilla-extract-getMediaQueryMin.css.ts.vanilla.css');
const vanillaExtractGetMediaQueryMinMaxTestCss = readGeneratedCss(
  'vanilla-extract-getMediaQueryMinMax.css.ts.vanilla.css'
);

it('should match compiled getFocusStyle() with jss (styles package)', () => {
  expect(jssGetFocusStyleTestCss).toMatchSnapshot();
});

it('should match compiled getHoverStyle() with jss (styles package)', () => {
  expect(jssGetHoverStyleTestCss).toMatchSnapshot();
});

it('should match compiled getMediaQueryMax() with jss (styles package)', () => {
  expect(jssGetMediaQueryMax).toMatchSnapshot();
});

it('should match compiled getMediaQueryMin() with jss (styles package)', () => {
  expect(jssGetMediaQueryMin).toMatchSnapshot();
});

it('should match compiled getMediaQueryMinMax() with jss (styles package)', () => {
  expect(jssGetMediaQueryMinMax).toMatchSnapshot();
});

it('should match compiled getFocusStyle() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetFocusStyleTestCss).toMatchSnapshot();
});

it('should match compiled getHoverStyle() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetHoverStyleTestCss).toMatchSnapshot();
});

it('should match compiled getMediaQueryMax() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetMediaQueryMaxTestCss).toMatchSnapshot();
});

it('should match compiled getMediaQueryMin() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetMediaQueryMinTestCss).toMatchSnapshot();
});

it('should match compiled getMediaQueryMinMax() with vanilla-extract (styles/vanilla-extract package)', () => {
  expect(vanillaExtractGetMediaQueryMinMaxTestCss).toMatchSnapshot();
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

it('should have equal compiled getMediaQueryMax() for jss and vanilla-extract', async () => {
  const veStyles = await prettier.format(vanillaExtractGetMediaQueryMaxTestCss, { parser: 'css' });
  const jssStyles = await prettier.format(jssGetMediaQueryMax, { parser: 'css' });
  expect(veStyles).toStrictEqual(jssStyles);
});

it('should have equal compiled getMediaQueryMin() for jss and vanilla-extract', async () => {
  const veStyles = await prettier.format(vanillaExtractGetMediaQueryMinTestCss, { parser: 'css' });
  const jssStyles = await prettier.format(jssGetMediaQueryMin, { parser: 'css' });
  expect(veStyles).toStrictEqual(jssStyles);
});

it('should have equal compiled getMediaQueryMinMax() for jss and vanilla-extract', async () => {
  const veStyles = await prettier.format(vanillaExtractGetMediaQueryMinMaxTestCss, { parser: 'css' });
  const jssStyles = await prettier.format(jssGetMediaQueryMinMax, { parser: 'css' });
  expect(veStyles).toStrictEqual(jssStyles);
});
