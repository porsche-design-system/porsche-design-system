import {
  type GetThemedMarkup,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import { type Page } from 'puppeteer';

// TODO: (button states test is flaky) we shouldn't rely on retries since computed result has to be deterministic
jest.retryTimes(3);

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'button', '/#button')).toBeFalsy();
});

// TODO: abstract into helper function, like vrtTest(…)
const statesScenario = async (page: Page, prefersColorScheme: 'light' | 'dark'): Promise<void> => {
  const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(3, 33.33333%); }
          p-button:not(:last-child) { margin-right: 1rem; margin-bottom: 1rem; }
        </style>`;

  const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-button theme="${theme}" variant="primary">Primary</p-button>
        <p-button theme="${theme}" variant="secondary">Secondary</p-button>
        <p-button theme="${theme}" variant="tertiary">Tertiary</p-button>
        <p-button theme="${theme}" variant="primary" icon="arrow-right">Primary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="tertiary" icon="arrow-right">Tertiary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="tertiary" icon="arrow-right">Tertiary with icon</p-button>
        <p-button theme="${theme}" variant="primary" hide-label="true" icon="arrow-right">Primary with icon only</p-button>
        <p-button theme="${theme}" variant="secondary" hide-label="true" icon="arrow-right">Secondary with icon only</p-button>
        <p-button theme="${theme}" variant="tertiary" hide-label="true" icon="arrow-right">Tertiary with icon only</p-button>
        <p-button theme="${theme}" variant="primary" loading>Loading Primary</p-button>
        <p-button theme="${theme}" variant="secondary" loading>Loading Secondary</p-button>
        <p-button theme="${theme}" variant="tertiary" loading>Loading Tertiary</p-button>`;

  await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
    injectIntoHead: head,
  });

  const cdpSession = await page.target().createCDPSession();
  await cdpSession.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-color-scheme', value: prefersColorScheme || 'light' }],
  });

  await forceHoverState(page, '.hover p-button >>> button');
  await forceFocusState(page, '.focus p-button'); // native outline should not be visible
  await forceFocusState(page, '.focus p-button >>> button');
  await forceFocusHoverState(page, '.focus-hover p-button >>> button');
};

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();

  expect(
    await vrt.test('button-states-dark', async () => {
      const page = vrt.getPage();
      await statesScenario(page, 'dark');
    })
  ).toBeFalsy();

  expect(
    await vrt.test('button-states-light', async () => {
      const page = vrt.getPage();
      await statesScenario(page, 'light');
    })
  ).toBeFalsy();
});
