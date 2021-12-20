import { forceHoverState, setContentWithDesignSystem } from '../helpers';
import { waitForComponentsReady } from '../../e2e/helpers';
import { getVisualRegressionStatesTester } from '@porsche-design-system/shared/testing';
import { Theme } from '@porsche-design-system/components/dist/types/types';

it('should have no visual regression for :hover', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('select-wrapper-dropdown-states', async () => {
      const page = vrt.getPage();

      const head = `<style>
  p-select-wrapper-dropdown { --p-dropdown-position: 'static'; }
  p-select-wrapper-dropdown:not(:last-child) { margin-bottom: 1rem; }
</style>`;

      const markup = `
<div class="playground light hover"></div>
<div class="playground dark hover"></div>`;

      await setContentWithDesignSystem(page, markup, {
        injectIntoHead: head,
      });

      await page.evaluate(() => {
        const getDropdown = (label: string, theme: Theme): Node => {
          const select = document.createElement('select');
          select.append(
            ...Array.from(Array(4)).map((_, idx) => {
              const option = document.createElement('option');
              option.textContent = `Option ${label} ${idx + 1}`;
              return option;
            })
          );

          const dropdown = document.createElement('p-select-wrapper-dropdown');
          (dropdown as any).selectRef = select;
          (dropdown as any).isOpenOverride = true;
          (dropdown as any).direction = 'down';
          (dropdown as any).state = 'none';

          if (theme === 'dark') {
            (dropdown as any).theme = 'dark';
          }

          return dropdown;
        };

        const getMarkup = (theme: Theme): Node[] => {
          const dropdownDefault = getDropdown('default', theme);

          const dropdownDisabled = getDropdown('disabled', theme);
          (dropdownDisabled as any).selectRef.children[0].disabled = true;

          const dropdownOptGroup = getDropdown('optgroup', theme);
          Array.from((dropdownOptGroup as any).selectRef.children).forEach((optionEl: HTMLOptionElement, idx) => {
            if (idx === 0 || idx === 2) {
              const optGroup = document.createElement('optgroup');
              optGroup.label = 'Some Optgroup';
              (dropdownOptGroup as any).selectRef.insertBefore(optGroup, optionEl);
              optGroup.prepend(optionEl.nextElementSibling);
              optGroup.prepend(optionEl);
            }
          });

          const dropdownScrollable = getDropdown('scrollable', theme);
          (dropdownScrollable as any).selectRef.append(
            ...Array.from(Array(8)).map((_, idx) => {
              const option = document.createElement('option');
              option.textContent = `Option scrollable ${idx + 4 + 1}`;
              return option;
            })
          );

          const dropdownDirectionUp = getDropdown('directionUp ', theme);
          (dropdownDirectionUp as any).direction = 'up';

          const dropdownFilter = getDropdown('filter', theme);
          (dropdownFilter as any).filter = true;
          (dropdownFilter as any).selectRef = document.createElement('select'); // without options

          return [
            dropdownDefault,
            dropdownDisabled,
            dropdownOptGroup,
            dropdownScrollable,
            dropdownDirectionUp,
            dropdownFilter,
          ];
        };

        document.querySelector('.playground.light').append(...getMarkup('light'));
        document.querySelector('.playground.dark').append(...getMarkup('dark'));
      });

      await waitForComponentsReady(page);

      // visually hide button and span since it produces some absolute borders
      await page.evaluate(() => {
        document.querySelectorAll('p-select-wrapper-dropdown').forEach((el) => {
          const btn = el.shadowRoot.querySelector('button,span');
          if (btn) {
            btn.style.display = 'none';
          }
        });
      });

      await forceHoverState(page, '.hover p-select-wrapper-dropdown >>> li:first-child');
    })
  ).toBeFalsy();
});
