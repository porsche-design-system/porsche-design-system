import type { Browser } from 'puppeteer';

export * from './accessibility';
export * from './events';
export * from './puppeteer-helper';
export * from './stencil';

declare global {
  const browser: Browser;
}
