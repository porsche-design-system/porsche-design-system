import {
  forceHoveredState,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  setContentWithDesignSystem,
} from '../helpers';
import { OptionMap } from '@porsche-design-system/components/dist/types/components/form/select-wrapper/select-wrapper-utils';
import { waitForComponentsReady } from '../../e2e/helpers';

describe('Select Wrapper Dropdown', () => {
  it('should have no visual regression for :hover', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('select-wrapper-dropdown-states', async () => {
        const page = await vrt.getPage();

        const head = `<style type="text/css">
  :root { --p-transition-duration: 0s; }
  p-select-wrapper-dropdown { --p-dropdown-position: 'static'; }
  p-select-wrapper-dropdown:not(:last-child) { margin-bottom: 1rem; }
</style>`;

        const optionMaps: OptionMap[] = Array.from(Array(4)).map((_, idx) => ({
          key: idx,
          value: `Option ${idx + 1}`,
          disabled: false,
          highlighted: false,
          selected: false,
          hidden: false,
          initiallyHidden: false,
        }));

        const body = `<script>
  const optionMaps = ${JSON.stringify(optionMaps)};


  document.querySelectorAll('p-select-wrapper-dropdown').forEach((el, idx) => {
    el.optionMaps = optionMaps;
    el.open = true;
    el.direction = 'down';
  });

  document.querySelectorAll('.with-selected-option').forEach((el) => {
    el.optionMaps = optionMaps.map((x, idx) => ({ ...x, ...(idx === 0 && { selected: true }) }));
  });
  document.querySelectorAll('.with-disabled-option').forEach((el) => {
    el.optionMaps = optionMaps.map((x, idx) => ({ ...x, ...(idx === 0 && { disabled: true }) }));
  });
  document.querySelectorAll('.with-optgroup').forEach((el) => {
    el.optionMaps = optionMaps.map((x, idx) => ({ ...x, ...((idx === 0 || idx === 2) && { title: 'Some Optgroup' }) }));
  });
  document.querySelectorAll('.scrollable').forEach((el) => {
    el.optionMaps = optionMaps.concat(optionMaps, optionMaps).map((x, idx) => ({ ...x, value: \`Option \${idx + 1}\` }));
  });
  document.querySelectorAll('.direction-up').forEach((el) => {
    el.direction = 'up';
  });
  document.querySelectorAll('[filter]').forEach((el) => {
    el.optionMaps = [];
  });
</script>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-select-wrapper-dropdown theme="${theme}"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" class="with-selected-option"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" class="with-disabled-option"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" class="with-optgroup"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" class="scrollable"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" class="direction-up"></p-select-wrapper-dropdown>
          <p-select-wrapper-dropdown theme="${theme}" filter></p-select-wrapper-dropdown>
        `;

        const markup = `
<div class="playground light hovered">${getElementsMarkup('light')}</div>
<div class="playground dark hovered">${getElementsMarkup('dark')}</div>`;

        await setContentWithDesignSystem(page, markup, {
          injectIntoHead: head,
          injectBeforeClosingBody: body,
        });

        await waitForComponentsReady(page);

        await forceHoveredState(page, '.hovered > p-select-wrapper-dropdown >>> div');
      })
    ).toBeFalsy();
  });
});
