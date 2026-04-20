import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  type W3CValidationMessage,
  formatW3CMessages,
  validateCssWithW3C,
} from '@porsche-design-system/shared/testing';

const distDir = path.resolve(__dirname, '../../../dist');

const cssFiles = ['index.css'];

const readCss = (file: string) => fs.readFileSync(path.join(distDir, file), 'utf-8');

// Known false positives — Tailwind v4 at-rules not recognized by the W3C validator.
const KNOWN_FALSE_POSITIVES: Array<(e: W3CValidationMessage) => boolean> = [
  (e) => e.message.includes('Unrecognized at-rule') && e.message.includes('@utility'),
  (e) => e.message.includes('Unrecognized at-rule') && e.message.includes('@theme'),
];

const filterFalsePositives = (errors: W3CValidationMessage[]): W3CValidationMessage[] =>
  errors.filter((e) => !KNOWN_FALSE_POSITIVES.some((fn) => fn(e)));

describe('W3C CSS validation (tailwindcss)', () => {
  it.each(cssFiles)(
    '%s should be valid CSS per W3C CSS validator',
    async (file) => {
      const result = await validateCssWithW3C(readCss(file));
      const realErrors = filterFalsePositives(result.errors);
      if (realErrors.length > 0) {
        // biome-ignore lint/suspicious/noConsole: surface validator messages in test output
        console.error(`W3C validation errors in ${file}:\n${formatW3CMessages(realErrors)}`);
      }
      expect(realErrors, `W3C validator reported errors for ${file}`).toEqual([]);
    },
    60_000
  );
});

