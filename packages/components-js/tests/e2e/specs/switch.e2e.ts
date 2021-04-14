import { Page } from 'puppeteer';
import { getBrowser, setContentWithDesignSystem } from '../helpers';

describe('tabs-bar', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const initSwitch = (): Promise<void> => {
    return setContentWithDesignSystem(page, `<p-switch label="Some label"></p-switch>`);
  };

  describe('accessibility', () => {
    it('should set correct aria-checked value', async () => {

    });
  });

});
