import fs from 'node:fs';
import path from 'node:path';
import {
  formatW3CMessages,
  validateCssWithW3C,
  type W3CValidationMessage,
} from '@porsche-design-system/shared/testing';
import { describe, expect, it } from 'vitest';

const distDir = path.resolve(__dirname, '../../../dist');

const cssFiles = [
  'index.css',
  'normalize.css',
  'variables.css',
  'color-scheme.css',
  'font-face.css',
  'cn/index.css',
  'cn/font-face.css',
];

const readCss = (file: string) => fs.readFileSync(path.join(distDir, file), 'utf-8');

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Known false positives — valid modern CSS not yet recognized by the W3C validator.
const KNOWN_FALSE_POSITIVES: Array<(e: W3CValidationMessage) => boolean> = [
  // `color-scheme: only dark|light` is valid per CSS Color Adjustment Module Level 1,
  // but the W3C validator does not support the `only` keyword yet.
  (e) =>
    e.message.includes('Too many values or values are not recognized') &&
    (e.context?.includes('scheme-only-dark') ?? false),
  (e) =>
    e.message.includes('Too many values or values are not recognized') &&
    (e.context?.includes('scheme-only-light') ?? false),
];

const filterFalsePositives = (errors: W3CValidationMessage[]): W3CValidationMessage[] =>
  errors.filter((e) => !KNOWN_FALSE_POSITIVES.some((fn) => fn(e)));

describe('W3C CSS validation (stylesheets)', () => {
  it.each(cssFiles)('%s should be valid CSS per W3C CSS validator', async (file) => {
    // Space out requests
    await sleep(1_000);
    const result = await validateCssWithW3C(readCss(file));
    const realErrors = filterFalsePositives(result.errors);
    if (realErrors.length > 0) {
      console.error(`W3C validation errors in ${file}:\n${formatW3CMessages(realErrors)}`);
    }
    expect(realErrors, `W3C validator reported errors for ${file}`).toEqual([]);
  }, 60_000);
});
