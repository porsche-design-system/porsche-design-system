import { Page } from 'puppeteer';
import { getBrowser, setContentWithDesignSystem } from '../helpers';
import { HeadlineTag } from '@porsche-design-system/components/src/components/basic/typography/headline/headline-utils';

describe('panel', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    tag?: HeadlineTag;
  };

  const clickHandlerScript = `
    <script>
      const panel = document.querySelector('p-panel')
      panel.addEventListener('panelStateChange', (panelChangeEvent) => {
          const { open } = panelChangeEvent.detail;
          panelChangeEvent.target.setAttribute('open', open);
      });
    </script>`;

  const initPanel = async (opts: InitOptions) => {
    const { tag } = opts ?? {};

    const content = `<p-panel panel-title="Some Panel" tag="${tag}">
  <p>
    Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua.
  </p>
</p-panel>`;

    await setContentWithDesignSystem(page, content);
  };

  it('should open panel on mouse click', () => {});

  it('should open panel on enter press', () => {});

  it('should emit panelStateChange on click ', () => {});

  describe('accessibility', () => {
    it('should have correct icon name on open / close', () => {});
    it('should have correct icon aria-label on open / close', () => {});
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {});

    it('should work without unnecessary round trips on prop change', async () => {});
  });
});
