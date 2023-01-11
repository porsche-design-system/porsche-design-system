import { setContentWithDesignSystem } from '../helpers';
import { evaluatePage } from '../../../src/evaluate-page';
import { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should retrieve children and hostPdsComponent correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
        <p-banner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </p-banner>
    `,
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});

it('should retrieve children correctly and put stripped content', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
    `,
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});

it('should retrieve hostPdsComponent correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
        <p-button variant="primary">
            Test button
        </p-button>
    `,
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});

it('should generate raw data correctly for 1 version and 2 prefixes', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
        <p-text>Second prefix</p-text>
        <my-prefix-p-text>First prefix</my-prefix-p-text>
  `,
    firstPdsVersionPrefixes: ['my-prefix', ''],
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});

it('should generate raw data correctly for 2 versions and 2 prefixes', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
        <test-prefix-p-text>First version first prefix</test-prefix-p-text>
        <test1-prefix-p-text>First version second prefix</test1-prefix-p-text>
        <p-text>Second version first prefix</p-text>
        <my-prefix-p-text>Second version second prefix</my-prefix-p-text>
  `,
    firstPdsVersionPrefixes: ['test-prefix', 'test1-prefix'],
    secondPdsVersionPrefixes: ['', 'my-prefix'],
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});

it('should retrieve object value from string correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
      <p-spinner size="{ base: 'small', l: 'medium' }" aria="{ 'aria-label': 'Loading page content' }" />
    `,
  });
  console.log('Evaluating page..');
  const crawlerData = await evaluatePage(page);
  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});
