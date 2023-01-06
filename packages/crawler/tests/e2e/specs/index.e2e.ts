import { crawlPage } from '../../../src/crawl-websites';
import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../../../constants';
import { PdsTestingContext, setContentWithDesignSystem } from '../helpers';

export const testCrawlerWithHtmlAndPrefixes = async (pdsTestingContext: PdsTestingContext): Promise<void> => {
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  );
  await setContentWithDesignSystem(page, pdsTestingContext);
  const crawlerData = await crawlPage(page, 'http://localhost');
  await browser.close();

  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
};

it('should retrieve children correctly', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <test-prefix-p-banner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </test-prefix-p-banner>
    `,
    firstPdsVersionPrefixes: ['test-prefix'],
  });
});
it('should generate raw data correctly for 2 prefixes', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <p-accordion heading="Some compact Accordion heading" compact="true">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </p-accordion>
        <p-banner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </p-banner>
        <p-button variant="primary" loading="true">Some label</p-button>
        <p-button-group>
          <p-button variant="primary">Some label</p-button>
          <p-button variant="secondary">Some label</p-button>
          <p-button variant="tertiary">Some label</p-button>
        </p-button-group>
        <p-button-pure>Label default</p-button-pure>
        <p-carousel heading="Heading">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </p-carousel>
        <p-checkbox-wrapper label="Some label">
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
        <p-content-wrapper>
          <p>Some content</p>
        </p-content-wrapper>
        <p-text-field-wrapper label="Some Label" description="Some Description">
          <input type="text" />
        </p-text-field-wrapper>
        <p-divider></p-divider>
        <p-fieldset-wrapper label="Some label"></p-fieldset-wrapper>
        <p-flex>
          <p-flex-item>
            <p>1</p>
          </p-flex-item>
          <p-flex-item>
            <p>2</p>
          </p-flex-item>
        </p-flex>
        <p-grid>
          <p-grid-item size="12">
            <p>12</p>
          </p-grid-item>
        </p-grid>
        <p-headline variant="large-title">The quick brown fox jumps over the lazy dog</p-headline>
        <p-icon size="small" aria-label="Icon"></p-icon>
        <p-inline-notification
          heading="Some neutral heading"
          description="Some description"
          theme="dark"
        ></p-inline-notification>
        <p-link variant="primary" href="https://www.porsche.com">Some label</p-link>
        <p-link-pure href="https://www.porsche.com">Label default</p-link-pure>
        <p-link-social href="https://www.facebook.com" icon="logo-facebook">Some label</p-link-social>
        <p-link-tile href="#" label="Some Label" description="Default">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
            height="50"
            alt="Some alt text"
          />
        </p-link-tile>
        <p-marque trademark="false"></p-marque>
        <p-modal heading="Some Heading" open="true">Some Content</p-modal>

        <my-prefix-p-text>TEST123</my-prefix-p-text>
        <test-prefix-p-text>TEST123</test-prefix-p-text>
  `,
    firstPdsVersionPrefixes: ['test-prefix'],
    secondPdsVersionPrefixes: ['', 'my-prefix'],
  });
});
