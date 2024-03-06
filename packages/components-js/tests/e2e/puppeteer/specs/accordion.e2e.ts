import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import type { HeadingTag } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const clickHandlerScript = `
<script>
  const accordion = document.querySelector('p-accordion');
  accordion.addEventListener('update', (e) => {
    e.target.open = e.detail.open;
  });
</script>`;

type InitOptions = {
  tag?: HeadingTag;
  otherMarkup?: string;
  hasInput?: boolean;
  isOpen?: boolean;
};

const initAccordion = (opts?: InitOptions) => {
  const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts || {};

  const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getButton = () => selectNode(page, 'p-accordion >>> button');
const getCollapsible = () => selectNode(page, 'p-accordion >>> .collapsible');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties', async () => {
    await initAccordion();
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
    expect(await getAttribute(button, 'aria-controls')).toBe('accordion-panel');
  });

  it('should expose correct accessibility tree properties in open state', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const button = await getButton();
    const panel = await getCollapsible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
    await expectA11yToMatchSnapshot(page, panel, { message: 'Of Panel', interestingOnly: false });
  });
});
