import {
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getConsoleErrorsAmount,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import { HeadingTag } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile-model-signature');
const getRoot = () => selectNode(page, 'p-link-tile-model-signature >>> .root');
const getOverlayAnchor = () => selectNode(page, 'p-link-tile-model-signature >>> a');
const getPrimaryLink = () => selectNode(page, 'p-link-tile-model-signature > p-link[slot="primary"] ');
const getSecondaryLink = () => selectNode(page, 'p-link-tile-model-signature > p-link[slot="secondary"] ');
const getHeading = () => selectNode(page, 'p-link-tile-model-signature >>> .heading');
const getDescription = () => selectNode(page, 'p-link-tile-model-signature >>> .description');

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=';

const initLinkTileModelSignature = (opts?: { description: string }): Promise<void> => {
  const { description } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-link-tile-model-signature heading="Some heading"${description ? ` description="${description}"` : ''}>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="https://porsche.com/" variant="primary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
  );
};

it('should mirror anchor props of slot name="primary" onto overlay anchor', async () => {
  await initLinkTileModelSignature();

  const primaryLink = await getPrimaryLink();
  const overlayAnchor = await getOverlayAnchor();

  expect(await getProperty(primaryLink, 'href')).toEqual(await getProperty(overlayAnchor, 'href'));
});

it('should wrap heading in correct headingTag', async () => {
  await initLinkTileModelSignature();

  expect(await (await getHeading()).evaluate((heading) => (heading.parentNode as HTMLElement).tagName)).toBe('H2');

  const host = await getHost();
  await setProperty(host, 'headingTag', 'h3');
  await waitForStencilLifecycle(page);

  expect(await (await getHeading()).evaluate((heading) => (heading.parentNode as HTMLElement).tagName)).toBe('H3');
});

it('should render description', async () => {
  await initLinkTileModelSignature({ description: 'Some description' });

  expect(await getDescription()).not.toBeNull();
});

it('should render only heading if description is undefined', async () => {
  await initLinkTileModelSignature();

  expect(await getHeading()).not.toBeNull();
  expect(await getDescription()).toBeNull();
});

describe('validation', () => {
  beforeEach(() => jest.spyOn(console, 'log').mockImplementation(jest.fn())); // Keep console clean for validation tests

  it('should throw error if slot contains more than three children', async () => {
    await initConsoleObserver(page);

    await setContentWithDesignSystem(
      page,
      `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
  <div></div>
</p-link-tile-model-signature>`
    );

    expect(getConsoleErrorsAmount()).toBe(1);
  });

  describe('primary', () => {
    it('should throw error if slot is missing', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if slot is not "p-link"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <a slot="primary" href="#" variant="primary" theme="dark">Some label</a>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if theme is not "dark"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="light">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if variant is not "primary"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="secondary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });
  });

  describe('secondary', () => {
    it('should throw error if slot is missing', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if slot is not "p-link"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
  <a slot="primary" href="#" variant="primary" theme="dark">Some label</a>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if theme is not "dark"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="light">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });

    it('should throw error if variant is not "secondary"', async () => {
      await initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="primary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>`
      );

      expect(getConsoleErrorsAmount()).toBe(1);
    });
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initLinkTileModelSignature();
    const status = await getLifecycleStatus(page);

    expect(
      status.componentDidLoad['p-link-tile-model-signature'],
      'componentDidLoad: p-link-tile-model-signature'
    ).toBe(1);
    expect(status.componentDidLoad['p-model-signature'], 'componentDidLoad: p-model-signature').toBe(1);
    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initLinkTileModelSignature();
    const host = await getHost();

    await setProperty(host, 'model', 'taycan');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-link-tile-model-signature'], 'componentDidUpdate: p-link-tile').toBe(1);
    expect(status.componentDidUpdate['p-model-signature'], 'componentDidUpdate: p-model-signature').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTileModelSignature();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });
});

describe('focus', () => {
  it('should have focus on slotted p-links', async () => {
    await setContentWithDesignSystem(
      page,
      `<a href="#" id="before">before</a>
<p-link-tile-model-signature
    heading="Some heading"
    >
  <img src="${imgSrc}" alt="Some image label"/>
  <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
  <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
</p-link-tile-model-signature>
<a href="#" id="after">after</a>`
    );
    const primaryLink = await getPrimaryLink();
    const primaryTagName = await primaryLink.evaluate((el) => el.tagName);

    const secondaryLink = await getSecondaryLink();
    const secondaryTagName = await secondaryLink.evaluate((el) => el.tagName);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after first tab click').toBe('A');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after second tab click').toBe(primaryTagName);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after third tab click').toBe(secondaryTagName);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after fourth tab click').toBe('A');
  });
});
