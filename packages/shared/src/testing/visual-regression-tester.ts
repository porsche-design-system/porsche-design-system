import * as fs from 'fs';
import * as path from 'path';
import type { Browser, ClickOptions, ElementHandle, Page, PuppeteerLifeCycleEvent, ScreenshotClip } from 'puppeteer';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

export type VisualRegressionTestOptions = {
  viewports?: number[];
  deviceScaleFactor?: number;
  fixturesDir?: string;
  resultsDir?: string;
  tolerance?: number;
  baseUrl?: string;
  timeout?: number;
  mode?: 'auto' | 'square-auto';
  waitUntilMethod?: PuppeteerLifeCycleEvent;
};

export type TestOptions = {
  elementSelector?: string;
  maskSelectors?: string[];
  regressionSuffix?: string;
  initialViewportHeight?: number;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type WritableDomRect = Writeable<Omit<DOMRect, 'toJson'>>;

export class VisualRegressionTester {
  private readonly options: VisualRegressionTestOptions = {
    viewports: [320, 480, 760, 1000, 1300, 1760],
    deviceScaleFactor: 1,
    fixturesDir: 'vrt/fixtures',
    resultsDir: 'vrt/results',
    tolerance: 0,
    baseUrl: 'http://localhost',
    timeout: 30000,
    mode: 'auto',
    waitUntilMethod: 'networkidle0',
  };
  private page: Page;

  constructor(private browser: Browser, options: VisualRegressionTestOptions = {}) {
    this.options = {
      ...this.options,
      ...options,
    };
  }
  getPage(): Page {
    return this.page;
  }

  async goTo(url: string, networkIdleTimeout: number = 500, maxInflightRequests: number = 0): Promise<void> {
    await Promise.all([
      this.waitForNetworkIdle(networkIdleTimeout, maxInflightRequests),
      this.page.goto(`${this.options.baseUrl}${url}`, { waitUntil: this.options.waitUntilMethod }),
    ]);
  }

  async click(
    selector: string,
    networkIdleTimeout: number = 500,
    maxInflightRequests: number = 0,
    options?: Partial<ClickOptions>
  ): Promise<void> {
    await Promise.all([
      this.waitForNetworkIdle(networkIdleTimeout, maxInflightRequests),
      this.page.click(selector, options),
    ]);
  }

  async focus(selector: string, networkIdleTimeout: number = 500, maxInflightRequests: number = 0): Promise<void> {
    await Promise.all([this.waitForNetworkIdle(networkIdleTimeout, maxInflightRequests), this.page.focus(selector)]);
  }

  async type(
    selector: string,
    input: string,
    networkIdleTimeout: number = 500,
    maxInflightRequests: number = 0
  ): Promise<void> {
    await Promise.all([
      this.waitForNetworkIdle(networkIdleTimeout, maxInflightRequests),
      this.page.type(selector, input),
    ]);
  }

  async hover(selector: string, networkIdleTimeout: number = 500, maxInflightRequests: number = 0): Promise<void> {
    await Promise.all([this.waitForNetworkIdle(networkIdleTimeout, maxInflightRequests), this.page.hover(selector)]);
  }

  async test(snapshotId: string, scenario: Function, options?: TestOptions): Promise<boolean> {
    sharp.cache(false);

    const opts: TestOptions = {
      elementSelector: '',
      maskSelectors: [],
      regressionSuffix: '',
      initialViewportHeight: 1,
      ...options,
    };

    const errors: number[] = [];

    for (const viewport of this.options.viewports) {
      const { regressionSuffix } = opts;
      const { fixturesDir, resultsDir } = this.options;
      const suffix = regressionSuffix ? '.' + regressionSuffix : '';

      const paths = {
        reference: `${fixturesDir}/${snapshotId}.${viewport}.png`,
        regression: `${resultsDir}/${snapshotId}${suffix}.${viewport}.png`,
        diff: `${resultsDir}/${snapshotId}${suffix}.${viewport}.diff.png`,
      };

      this.page = await this.newPage(viewport, opts.initialViewportHeight);

      this.cleanSnapshots([paths.regression, paths.diff]);

      await scenario();

      await this.page.setViewport({
        width: viewport,
        height: await this.page.evaluate(() => document.body.clientHeight),
        deviceScaleFactor: this.options.deviceScaleFactor,
      });

      // not sure why but reading document.body.clientHeight after the viewport was set is different in some scenarios
      await this.page.setViewport({
        width: viewport,
        height: await this.page.evaluate(() => document.body.clientHeight),
        deviceScaleFactor: this.options.deviceScaleFactor,
      });

      if (fs.existsSync(paths.reference)) {
        const fixture = sharp(path.resolve(paths.reference));
        const regression = await this.compareSnapshots(fixture, opts.elementSelector, opts.maskSelectors);

        if (regression) {
          fs.mkdirSync(path.resolve(this.options.resultsDir), { recursive: true });

          errors.push(viewport);
          await regression.result.toFile(paths.regression);
          await regression.diff.toFile(paths.diff);
        }
      } else {
        errors.push(viewport); // test execution shall fail, in case no fixture exists
        const reference = await this.createSnapshot(opts.elementSelector, opts.maskSelectors);
        await reference.toFile(paths.reference);
      }

      await this.page.close();
    }

    if (this.options.viewports.length > 1 && errors.length) {
      console.log('Failed viewports:', errors.join(', '));
    }

    return errors.length > 0;
  }

  public waitForNetworkIdle(timeout: number = 500, maxInflightRequests: number = 0): Promise<void> {
    const onRequestStarted = () => {
      ++inflight;
      if (inflight > maxInflightRequests) {
        clearTimeout(timeoutId);
      }
    };

    const onRequestFinished = () => {
      if (inflight === 0) {
        return;
      }
      --inflight;
      if (inflight === maxInflightRequests) {
        timeoutId = setTimeout(onTimeoutDone, timeout);
      }
    };

    const onTimeoutDone = () => {
      this.page.off('request', onRequestStarted);
      this.page.off('requestfinished', onRequestFinished);
      this.page.off('requestfailed', onRequestFinished);
      fulfill();
    };

    let inflight = 0;
    let fulfill: (value?: void | PromiseLike<void>) => void;
    let timeoutId = setTimeout(onTimeoutDone, timeout);

    this.page.on('request', onRequestStarted);
    this.page.on('requestfinished', onRequestFinished);
    this.page.on('requestfailed', onRequestFinished);

    return new Promise((x) => (fulfill = x));
  }

  private async newPage(viewport: number, viewportHeight: number): Promise<Page> {
    const page = await this.browser.newPage();
    page.setDefaultNavigationTimeout(this.options.timeout);
    await page.setViewport({
      width: viewport,
      height: this.options.mode === 'square-auto' ? viewport : viewportHeight,
      deviceScaleFactor: this.options.deviceScaleFactor,
    });

    return page;
  }

  private async createSnapshot(elementSelector: string, maskSelectors: string[]): Promise<sharp.Sharp> {
    let clip: ScreenshotClip = null;

    // elementHandle.screenshot() isn't working with disabled javascript which we use for SSR tests
    // since puppeteer 19.11.1 most likely because of internal IntersectionObserver which is used to scroll the element into vide
    // as a workaround we use the clipping feature of page.screenshot()
    if (elementSelector) {
      // inspired by https://github.com/puppeteer/puppeteer/blob/8124a7d5bfc1cfa8cb579271f78ce586efc62b8e/packages/puppeteer-core/src/common/ElementHandle.ts#L734
      const elementHandle = await this.page.$(elementSelector);
      const cdpSession = await this.page.target().createCDPSession();

      // taken from https://github.com/puppeteer/puppeteer/blob/8124a7d5bfc1cfa8cb579271f78ce586efc62b8e/packages/puppeteer-core/src/common/ElementHandle.ts#L267
      try {
        await cdpSession.send('DOM.scrollIntoViewIfNeeded', {
          objectId: elementHandle.remoteObject().objectId,
        });
      } catch (error) {
        // Fallback to Element.scrollIntoView if DOM.scrollIntoViewIfNeeded is not supported
        await elementHandle.evaluate(async (element): Promise<void> => {
          element.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'instant',
          });
        });
      }

      const boundingBox = await elementHandle.boundingBox();
      const layoutMetrics = await cdpSession.send('Page.getLayoutMetrics');
      // Fallback to `layoutViewport` in case of using Firefox.
      const { pageX, pageY } = layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;

      clip = Object.assign({}, boundingBox);
      clip.x += pageX;
      clip.y += pageY;
    }

    const buffer = await this.page.screenshot({
      captureBeyondViewport: false,
      ...(clip ? { clip } : { fullPage: true }),
    });

    const rawImage = sharp(buffer);

    return maskSelectors.length ? await this.maskSnapshot(rawImage, elementSelector, maskSelectors) : rawImage;
  }

  private async maskSnapshot(
    image: sharp.Sharp,
    elementSelector: string,
    maskSelectors: string[]
  ): Promise<sharp.Sharp> {
    // BoundingBoxes of Mask elements
    const boundingBoxes: WritableDomRect[] = [];

    for (const maskSelector of maskSelectors) {
      const maskElements = await this.page.$$(`${elementSelector} ${maskSelector}`);

      for (const maskElement of maskElements) {
        const boundingBox = await this.getBoundingBox(maskElement);
        if (boundingBox) {
          boundingBoxes.push(boundingBox);
        }
      }
    }

    const { width: imageWidth, height: imageHeight } = await image.metadata();
    // BoundingBox of Element to screenshot
    const elementBoundingBox: WritableDomRect = elementSelector
      ? await this.getBoundingBox(await this.page.$(elementSelector), 0)
      : ({
          left: 0,
          right: imageWidth,
          top: 0,
          height: imageHeight,
          width: imageWidth,
          bottom: imageHeight,
          x: 0,
          y: 0,
        } as WritableDomRect);

    image.composite(
      boundingBoxes.map((maskBoundingBox) => {
        // Adjust the size of the mask to fit in the area of the screenshot
        // ┌────────────┐
        // │ ┌────────┐ │
        // │ │  ┌─────┼─┤
        // │ │  │Mask │┼│
        // │ │  └─────┼─┤
        // │ └────────┘ │
        // └────────────┘

        if (maskBoundingBox.right > elementBoundingBox.right) {
          maskBoundingBox.width = maskBoundingBox.width - (maskBoundingBox.right - elementBoundingBox.right);
        }

        // ┌────────────┐
        // │ ┌────────┐ │
        // │ │ ┌────┐ │ │
        // │ │ │Mask│ │ │
        // │ └─┼────┼─┘ │
        // │   │┼┼┼┼│   │
        // └───┴────┴───┘

        if (maskBoundingBox.bottom > elementBoundingBox.bottom) {
          maskBoundingBox.height = maskBoundingBox.height - (maskBoundingBox.bottom - elementBoundingBox.bottom);
        }

        // ┌────────────┐
        // │ ┌────────┐ │
        // ├─┼─────┐  │ │
        // │┼│Mask │  │ │
        // ├─┼─────┘  │ │
        // │ └────────┘ │
        // └────────────┘

        if (maskBoundingBox.left < elementBoundingBox.left) {
          maskBoundingBox.width = maskBoundingBox.width - (elementBoundingBox.left - maskBoundingBox.left);
          maskBoundingBox.left = 0;
        }

        // ┌───┬────┬───┐
        // │   │┼┼┼┼│   │
        // │ ┌─┼────┼─┐ │
        // │ │ │Mask│ │ │
        // │ │ └────┘ │ │
        // │ └────────┘ │
        // └────────────┘

        if (maskBoundingBox.top < elementBoundingBox.top) {
          maskBoundingBox.height = maskBoundingBox.height - (elementBoundingBox.top - maskBoundingBox.top);
          maskBoundingBox.top = 0;
        }

        return {
          input: {
            create: {
              width: maskBoundingBox.width,
              height: maskBoundingBox.height,
              channels: 3,
              background: '#FF00FF',
            },
          },
          left: maskBoundingBox.left,
          top: maskBoundingBox.top,
        };
      })
    );

    return image;
  }

  private async getBoundingBox(element: ElementHandle, extendOuterBounds: number = 1): Promise<WritableDomRect> {
    const boundingBox = await element.evaluate((el) => {
      const { width, height, left, right, top, bottom } = el.getBoundingClientRect();
      return { width, height, left, right, top, bottom } as WritableDomRect;
    });

    if (boundingBox !== null && boundingBox.width !== 0 && boundingBox.height !== 0) {
      return {
        ...boundingBox,
        width: Math.ceil(boundingBox.width + extendOuterBounds * 2),
        height: Math.ceil(boundingBox.height + extendOuterBounds * 2),
        left: Math.floor(boundingBox.left - extendOuterBounds),
        right: Math.ceil(boundingBox.right + extendOuterBounds),
        top: Math.floor(boundingBox.top - extendOuterBounds),
        bottom: Math.ceil(boundingBox.bottom + extendOuterBounds),
      };
    }
  }

  private async compareSnapshots(
    fixture: sharp.Sharp,
    elementSelector: string,
    maskSelectors: string[]
  ): Promise<{ result: sharp.Sharp; diff: sharp.Sharp }> {
    const result = await this.createSnapshot(elementSelector, maskSelectors);
    const resultClone = result.clone();
    let { info: resultInfo, data: resultData } = await result.raw().toBuffer({ resolveWithObject: true });
    const { info: fixtureInfo, data: fixtureData } = await fixture.raw().toBuffer({ resolveWithObject: true });

    if (resultData.compare(fixtureData) !== 0) {
      let { height: resultHeight, width: resultWidth } = resultInfo;
      const { height: fixtureHeight } = fixtureInfo;

      if (resultHeight > fixtureHeight) {
        fixture.extend({
          bottom: resultHeight - fixtureHeight,
        });
      } else if (resultHeight < fixtureHeight) {
        result.extend({
          bottom: fixtureHeight - resultHeight,
        });

        const resultInfoData = await result.raw().toBuffer({ resolveWithObject: true });
        resultInfo = resultInfoData.info;
        resultData = resultInfoData.data;
        resultHeight = resultInfo.height;
      }

      const diff = resultData;
      const fixtureRaw = await fixture.toBuffer();

      const pixelDiff = pixelmatch(resultData, fixtureRaw, diff, resultWidth, resultHeight, {
        threshold: this.options.tolerance,
      });

      // To avoid breaking changes we need to calculate the threshold like it was with Jimp
      const percent = pixelDiff / (resultWidth * resultHeight);

      if (percent !== 0) {
        return {
          result: resultClone,
          diff: sharp(diff, { raw: resultInfo }),
        };
      }
    }
  }

  private cleanSnapshots(paths: string[]): void {
    paths
      .map((p) => path.resolve(p))
      .forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
  }
}
