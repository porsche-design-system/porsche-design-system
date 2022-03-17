import { Page } from 'puppeteer';
import { goto, selectNode } from '../helpers';
import { PDS_SKELETON_CLASS_PREFIX } from '@porsche-design-system/shared';
import { getProperty } from '@porsche-design-system/js/tests/e2e/helpers';

describe('injection-token', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => await page.close());

  const skeletonThemeClass = `${PDS_SKELETON_CLASS_PREFIX}theme-dark`;
  const getHost = () => selectNode(page, `p-button.${skeletonThemeClass}`);

  it('should have skeleton classes on component', async () => {
    await goto(page, 'button-skeleton');

    const host = await getHost();
    const className = (await getProperty(host, 'className')) as string;

    expect(className.includes(skeletonThemeClass)).toBe(true);
  });
});
