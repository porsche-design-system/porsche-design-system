import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  getPageThrownErrorsAmount,
  getProperty,
  initPageErrorObserver,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile-model-signature');
const getRoot = () => selectNode(page, 'p-link-tile-model-signature >>> .root');
const getOverlayAnchor = () => selectNode(page, 'p-link-tile-model-signature >>> a');
const getPrimaryLink = () => selectNode(page, 'p-link-tile-model-signature > p-link[slot="primary"] ');
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

it('should render description', async () => {
  await initLinkTileModelSignature({ description: 'Some description' });

  expect(await getDescription()).not.toBeNull();
});

it('should render only heading if description is undefined', async () => {
  await initLinkTileModelSignature();

  expect(await getHeading()).not.toBeNull();
  expect(await getDescription()).toBeNull();
});

// describe('validation', () => {
//   it('should throw error if slot contains more than three children', async () => {
//     await initPageErrorObserver(page);
//
//     await setContentWithDesignSystem(
//       page,
//       `<p-link-tile-model-signature
//   heading="Some heading"
// >
//   <img src="${imgSrc}" alt="Some image label"/>
//   <p-link slot="primary" href="#" variant="primary" theme="dark">Some label</p-link>
//   <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
//   <div></div>
// </p-link-tile-model-signature>`
//     );
//     await waitForStencilLifecycle(page);
//
//     expect(getPageThrownErrorsAmount()).toBe(1);
//   });
//   describe('primary', () => {
//     it('should throw error if slot is missing', async () => {
//       await initPageErrorObserver(page);
//
//       await setContentWithDesignSystem(
//         page,
//         `<p-link-tile-model-signature
//   heading="Some heading"
// >
//   <img src="${imgSrc}" alt="Some image label"/>
//   <p-link slot="secondary" href="#" variant="secondary" theme="dark">Some label</p-link>
// </p-link-tile-model-signature>`
//       );
//
//       expect(getPageThrownErrorsAmount()).toBe(1);
//     });
//     it('should throw error if slot is not "p-link"', async () => {});
//     it('should throw error if theme is not "dark"', async () => {});
//     it('should throw error if variant is not "primary"', async () => {});
//   });
//   describe('secondary', () => {
//     it('should throw error if slot is missing', async () => {});
//     it('should throw error if slot is not "p-link"', async () => {});
//     it('should throw error if theme is not "dark"', async () => {});
//     it('should throw error if variant is not "secondary"', async () => {});
//   });
// });

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
