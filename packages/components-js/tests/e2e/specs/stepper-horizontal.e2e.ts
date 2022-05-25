import { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

describe('scrolling', () => {
  it('should scroll current step into view', async () => {});

  it('should not throw error when clicked between steps', async () => {});

  it('should scroll current step to correct position direction next', async () => {});

  it('should scroll current step to correct position direction prev', async () => {});
});

describe('stepper-horizontal-item', () => {
  describe('onClick', () => {
    it('should stop propagation if state="current"', async () => {});

    it('should stop propagation if disabled', async () => {});
  });

  it('should be disabled when state is undefined', async () => {});

  // Only needed when set by javascript
  it('should have correct step count', async () => {});

  describe('onClick', () => {});
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {});

  it('should work without unnecessary round trips on prop change', async () => {});

  it('should work without unnecessary round trips when step is added / removed', async () => {});
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree of stepper-horizontal', async () => {});
});
