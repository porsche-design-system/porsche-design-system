import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem, waitForStencilLifecycle } from '../helpers';
import { type HeadingTag } from '@porsche-design-system/components/dist/types/bundle';

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

const initAccordion = (page: Page, opts?: InitOptions) => {
  const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts || {};

  const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

  return setContentWithDesignSystem(page, content);
};

const getButton = (page: Page) => page.$('p-accordion button');
const getCollapsible = (page: Page) => page.$('p-accordion .collapsible');

test('should expose correct initial accessibility tree and aria properties', async ({ page }) => {
  await initAccordion(page);
  const button = await getButton(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
  expect(await getAttribute(button, 'aria-controls')).toBe('accordion-panel');
});

test.fixme('should expose correct accessibility tree properties in open state', async ({ page }) => {
  await initAccordion(page, { otherMarkup: clickHandlerScript });
  const button = await getButton(page);
  const panel = await getCollapsible(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
  // await expectA11yToMatchSnapshot(page, panel, { message: 'Of Panel', interestingOnly: false });
});
