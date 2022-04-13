import {
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
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tag', '/#tag')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tag-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
        p-tag:not(:last-child) { margin-right: 0.5rem; }
        .row:not(:last-child) { margin-bottom: 0.5rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div class="row">
          <p-tag theme="${theme}" color="background-default" icon="car">Text</p-tag>
          <p-tag theme="${theme}" color="background-default">Text</p-tag>
          <p-tag theme="${theme}" color="background-surface">Text</p-tag>
          <p-tag theme="${theme}" color="neutral-contrast-high">Text</p-tag>
          <p-tag theme="${theme}" color="notification-neutral">Text</p-tag>
          <p-tag theme="${theme}" color="notification-success">Text</p-tag>
          <p-tag theme="${theme}" color="notification-error">Text</p-tag>
          <p-tag theme="${theme}" color="notification-warning">Text</p-tag>
        </div>
        <div class="row">
          <p-tag theme="${theme}" color="background-default" icon="car"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="background-default"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="background-surface"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="neutral-contrast-high"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="notification-neutral"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="notification-success"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="notification-error"><a href="#">Link</a></p-tag>
          <p-tag theme="${theme}" color="notification-warning"><a href="#">Link</a></p-tag>
        </div>
        <div class="row">
          <p-tag theme="${theme}" color="background-default" icon="car"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="background-default"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="background-surface"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="neutral-contrast-high"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="notification-neutral"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="notification-success"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="notification-error"><button>Button</button></p-tag>
          <p-tag theme="${theme}" color="notification-warning"><button>Button</button></p-tag>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup, { withSurface: true }), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tag >>> span');
      await forceHoverState(page, '.hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.
      await forceFocusState(page, '.focus p-tag a');
      await forceFocusState(page, '.focus p-tag button');
      await forceFocusState(page, '.focus-hover p-tag a');
      await forceFocusState(page, '.focus-hover p-tag button');
      await forceHoverState(page, '.focus-hover p-tag >>> span');
      await forceHoverState(page, '.focus-hover p-tag button');
      await forceHoverState(page, '.focus-hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.
    })
  ).toBeFalsy();
});
