import { Page } from 'puppeteer';
import { getElementStyle, selectNode, setContentWithDesignSystem } from '../../e2e/helpers/puppeteer-helper';
import { HeadlineTag } from '@porsche-design-system/components/src/components/basic/typography/headline/headline-utils';

describe('accordion', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    tag?: HeadlineTag;
    otherMarkup?: string;
    hasInput?: boolean;
    isOpen?: boolean;
  };

  const clickHandlerScript = `
    <script>
      const accordion = document.querySelector('p-accordion')
      accordion.addEventListener('accordionChange', (e) => {
          e.target.open = e.detail.open;
      });
    </script>`;

  const initAccordion = async (opts?: InitOptions) => {
    const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts ?? {};

    const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = () => selectNode(page, 'p-accordion');
  const getButton = () => selectNode(page, 'p-accordion >>> button');
  const getInput = () => selectNode(page, 'input');
  const getCollapsible = () => selectNode(page, 'p-accordion >>> .collapsible');
  const getBody = () => selectNode(page, 'body');

  const getOverflowOnCollapsible = async () => getElementStyle(await getCollapsible(), 'overflow');
  const getVisibilityOnCollapsible = async () => getElementStyle(await getCollapsible(), 'visibility');

  it('should set "visibility: visible" on collapsible on initial open', async () => {
    await initAccordion({ isOpen: true });
    expect(await getVisibilityOnCollapsible()).toBe('visible');
  });
});
