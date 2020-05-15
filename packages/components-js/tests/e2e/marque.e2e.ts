import { setContentWithDesignSystem } from './helpers';
import { Viewport } from 'puppeteer';

describe('marque', () => {
  let initialViewport: Viewport;
  let requestedImagePath: string;

  beforeAll(async () => {
    initialViewport = page.viewport();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.endsWith('.png')) {
        requestedImagePath = url;
      }
      req.continue();
    });
  });

  beforeEach(async () => {
    requestedImagePath = ''; // reset
    await page.setViewport(initialViewport); // reset to default
  });

  const resolution1x = '@1x';
  const resolution2x = '@2x';
  const resolution3x = '@3x';

  describe('with trademark', () => {
    const setContent = () => setContentWithDesignSystem(`<p-marque></p-marque>`);

    describe('on default screen', () => {
      const fileName = 'marque-trademark.small';

      it('should request correct image for 1x resolution', async () => {
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      const fileName = 'marque-trademark.medium';

      beforeEach(async () => {
        await page.setViewport({ ...initialViewport, width: 1300 });
      });

      it('should request correct image for 1x resolution', async () => {
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });
  });

  describe('without trademark', () => {
    const setContent = () => setContentWithDesignSystem(`<p-marque trademark="false"></p-marque>`);

    describe('on default screen', () => {
      const fileName = 'marque.small';

      it('should request correct image for 1x resolution', async () => {
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      const fileName = 'marque.medium';

      beforeEach(async () => {
        await page.setViewport({ ...initialViewport, width: 1300 });
      });

      it('should request correct image for 1x resolution', async () => {
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContent();
        expect(requestedImagePath).toContain(fileName);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });
  });
});
