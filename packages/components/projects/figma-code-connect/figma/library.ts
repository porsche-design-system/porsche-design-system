import { readFileSync } from 'node:fs';

// The library the records point at, from `interactiveSetupFigmaFileUrl` in figma.config.json.
// Only the CLI's setup wizard reads that key, so it can hold the switch between libraries.
const configPath = 'figma.config.json';

/** The library URL, without query or fragment: the form the `// url=` lines and the icon manifest carry. */
export const libraryUrl = (config = configPath): string => {
  const url: unknown = JSON.parse(readFileSync(config, 'utf8')).codeConnect?.interactiveSetupFigmaFileUrl;
  if (typeof url !== 'string' || !/figma\.com\/(design|file)\/[0-9a-zA-Z]+/.test(url)) {
    throw new Error(`${config}: codeConnect.interactiveSetupFigmaFileUrl must be the library's Figma URL`);
  }
  return url.replace(/[?#].*$/, '').replace(/\/$/, '');
};

/** The file key inside a Figma URL. */
export const fileKeyOf = (url: string): string => url.match(/figma\.com\/(?:design|file)\/([0-9a-zA-Z]+)/)?.[1] ?? '';
