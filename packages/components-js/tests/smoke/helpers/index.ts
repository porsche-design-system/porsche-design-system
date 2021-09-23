import type { Browser } from 'puppeteer';

export * from './puppeteer-helper';

declare global {
  const browser: Browser;
}
