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
import { TAG_COLORS } from '../../../../components/src/components/action/tag/tag-utils';
import type { Theme } from '@porsche-design-system/utilities-v2';

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

      const getColorVariations = (theme: Theme, child: string): string =>
        [TAG_COLORS[0], ...TAG_COLORS]
          .map((color, i) => `<p-tag theme="${theme}" color="${color}"${i === 0 ? 'icon="car"' : ''}>${child}</p-tag>`)
          .join('\n');

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div class="row">
          ${getColorVariations(theme, 'Text')}
        </div>
        <div class="row">
          ${getColorVariations(theme, '<a href="#">Link</a>')}
        </div>
        <div class="row">
          ${getColorVariations(theme, '<button>Button</button>')}
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
