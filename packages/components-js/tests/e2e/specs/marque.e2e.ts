import {
  getBrowser,
  getLifecycleStatus,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('marque', () => {
  let page: Page;
  let requestedImagePath: string;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    requestedImagePath = '';

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.endsWith('.png')) {
        requestedImagePath = url;
      }
      req.continue();
    });
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, '.p-marque');
  const setContentWithoutTrademark = () => setContentWithDesignSystem(page, `<p-marque trademark="false"></p-marque>`);
  const setContentWithTrademark = () => setContentWithDesignSystem(page, `<p-marque></p-marque>`);

  const resolution1x = '@1x';
  const resolution2x = '@2x';
  const resolution3x = '@3x';

  describe('with trademark', () => {
    describe('on default screen', () => {
      const fileName = 'marque-trademark.small';

      beforeEach(async () => await page.setViewport({ width: 1299, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      const fileName = 'marque-trademark.medium';

      beforeEach(async () => await page.setViewport({ width: 1300, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });
  });

  describe('without trademark', () => {
    describe('on default screen', () => {
      const fileName = 'marque.small';

      beforeEach(async () => await page.setViewport({ width: 1299, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      const fileName = 'marque.medium';

      beforeEach(async () => await page.setViewport({ width: 1300, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await setContentWithTrademark();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-marque']).toBe(1, 'componentDidLoad: p-marque');

      expect(status.componentDidLoad.all).toBe(1, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });
  });
});
