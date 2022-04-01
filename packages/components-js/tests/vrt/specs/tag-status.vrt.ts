import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from 'shared/src/testing/vrt';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tag-status', '/#tag-status')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tag-status-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        p-tag-status:not(:last-child) { margin-right: 0.5rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-tag-status theme="${theme}" color="neutral-contrast-high"><a href="#">Tag with Link</a></p-tag-status>
          <p-tag-status theme="${theme}" color="neutral-contrast-high"><button>Tag with Button</button></p-tag-status>
          <p-tag-status theme="${theme}" color="notification-success"><a href="#">Tag with Link</a></p-tag-status>
          <p-tag-status theme="${theme}" color="notification-success"><button>Tag with Button</button></p-tag-status>
          <p-tag-status theme="${theme}" color="notification-error"><a href="#">Tag with Link</a></p-tag-status>
          <p-tag-status theme="${theme}" color="notification-error"><button>Tag with Button</button></p-tag-status>
          <p-tag-status theme="${theme}"><a href="#">Tag with Link</a></p-tag-status>
          <p-tag-status theme="${theme}"><button>Tag with Button</button></p-tag-status>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover > p-tag-status >>> span');
      await forceHoverState(page, '.hover > p-tag-status a'); // TODO: chrome hover bug. Remove when fixed.
      await forceFocusState(page, '.focus > p-tag-status a');
      await forceFocusState(page, '.focus > p-tag-status button');
      await forceFocusState(page, '.focus-hover > p-tag-status a');
      await forceFocusState(page, '.focus-hover > p-tag-status button');
      await forceHoverState(page, '.focus-hover > p-tag-status >>> span');
      await forceHoverState(page, '.focus-hover > p-tag-status button');
      await forceHoverState(page, '.focus-hover > p-tag-status a'); // TODO: chrome hover bug. Remove when fixed.
    })
  ).toBeFalsy();
});
