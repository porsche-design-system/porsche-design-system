import * as Jimp from 'jimp/dist';
import * as del from 'del';
import * as fs from 'fs';
import { Page, Response } from 'puppeteer';

interface Options {
  viewports?: number[];
  fixturesDir?: string;
  resultsDir?: string;
  tolerance?: number;
  baseUrl?: string;
}

export class VisualRegressionTester {

  private options: Options = {
    viewports: [320, 480, 760, 1000, 1300, 1760],
    fixturesDir: 'vrt/fixtures',
    resultsDir: 'vrt/results',
    tolerance: 0,
    baseUrl: 'http://localhost:3000/patterns'
  };

  constructor(private page: Page, options?: Options) {
    this.options = {
      ...this.options,
      ...options
    };
  }

  private async createSnapshot(maskSelectors: string[]): Promise<Jimp> {
    const buffer = await this.page.screenshot({fullPage: true});
    let image = await Jimp.read(buffer);
    image = await this.maskSnapshot(image, maskSelectors);

    return image;
  }

  private async maskSnapshot(image: Jimp, selectors: string[]): Promise<Jimp> {
    for (const selector of selectors) {
      const element = await this.page.$(selector);
      const boundingBox = await element.boundingBox();
      const mask = await new Jimp(boundingBox.width, boundingBox.height, '#FF00FF');

      image = await image.composite(mask, boundingBox.x, boundingBox.y);
    }

    return image;
  }

  private async compareSnapshots(reference: Jimp, excludes: string[]): Promise<{image: Jimp, diff: Jimp} | null> {
    const image = await this.createSnapshot(excludes);
    const diff = await Jimp.diff(reference, image, this.options.tolerance);

    if (diff.percent === 0) {
      return null;
    }

    return {
      image: image,
      diff: diff.image
    };
  }

  private async cleanSnapshots(paths: string[]): Promise<void> {
    await del(paths);
  }

  public async goTo(url: string): Promise<Response> {
    return await this.page.goto(`${this.options.baseUrl}/${url}`, {waitUntil: 'networkidle0'});
  }

  public async test(snapshotId: string, scenario: Function, maskSelectors: string[] = []): Promise<boolean> {
    let error = false;

    for (const viewport of this.options.viewports) {

      const paths = {
        reference: `${this.options.fixturesDir}/${snapshotId}.${viewport}.png`,
        regression: `${this.options.resultsDir}/${snapshotId}.${viewport}.png`,
        diff: `${this.options.resultsDir}/${snapshotId}.${viewport}.diff.png`
      };

      await this.cleanSnapshots([paths.regression, paths.diff]);

      await this.page.setViewport({width: viewport, height: 1});

      await scenario();

      if (fs.existsSync(paths.reference)) {
        const reference = await Jimp.read(paths.reference);
        const regression = await this.compareSnapshots(reference, maskSelectors);

        if (regression) {
          error = true;
          await regression.image.write(paths.regression);
          await regression.diff.write(paths.diff);
        }

        continue;
      }

      const reference = await this.createSnapshot(maskSelectors);
      await reference.write(paths.reference);
    }

    return error;
  }
}
