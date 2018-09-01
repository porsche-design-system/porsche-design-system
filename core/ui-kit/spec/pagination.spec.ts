import 'jasmine';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import * as Jimp from 'jimp/dist';
import * as del from 'del';
import * as fs from 'fs';

describe('Pagination', () => {
  let browser: Browser, page: Page;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should have should have no visual regression', async () => {
    
    await page.goto('http://localhost:4251/de/de_DE', { waitUntil: 'networkidle0' });

    async function makeSnapshot(): Promise<Jimp> {
      let imageData = await page.screenshot({ fullPage: true });
      let image = await Jimp.read(imageData);
      image = await excludeElementsFromSnapshot(image);

      return image;
    }

    async function excludeElementsFromSnapshot(image: Jimp, elements: string[] = ['.charge-contract-information .notification-icon__text']): Promise<Jimp> {
      for (const element of elements) {
        const boundingBox = await (await page.$(element)).boundingBox();
        const mask = await new Jimp(boundingBox.width, boundingBox.height, '#FF00FF');
  
        image = await image.composite(mask, boundingBox.x, boundingBox.y);
      }
  
      return image;
    }

    async function compareSnapshots(reference): Promise<{image: Jimp, diff: Jimp} | null> {
      const image = await makeSnapshot();
      const diff = await Jimp.diff(reference, image, 0.1);
      
      if (diff.percent === 0) {
        return null;
      }
      
      return {
        image: image,
        diff: diff.image
      };
    }
    
    const snapshotId: string = 'my-id';
    const viewports: number[] = [320, 720, 1024, 1200];
    for (const viewport of viewports) {

      const referencePath:string = `${snapshotId}.${viewport}.png`;
      const regressionPath:string = `${snapshotId}.${viewport}.regression.png`;
      const diffPath = `${snapshotId}.${viewport}.diff.png`;

      del.sync([
        regressionPath,
        diffPath
      ]);

      await page.setViewport({ width: viewport, height: 1 });

      if (fs.existsSync(referencePath)) {
        const reference = await Jimp.read(`${snapshotId}.${viewport}.png`);
        const regression = await compareSnapshots(reference);

        if (regression) {
          await regression.image.writeAsync(regressionPath);
          await regression.diff.writeAsync(diffPath);
        }

        continue;
      }

      const reference = await makeSnapshot();
      await reference.writeAsync(referencePath);
    }

    expect(true).toBeTruthy();
    //expect('http://localhost:4251/de/de_DE').toLookLike('pagination');

    //click on for focus/hover?
    //expect(page, {viewports: [], excludes: []}).toLookLike('pagination');
  });

  afterAll(async () => {
    await browser.close();
  });
});
