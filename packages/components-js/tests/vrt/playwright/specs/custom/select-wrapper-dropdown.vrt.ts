import { expect, type Page, test } from '@playwright/test';
import type { Theme } from '@porsche-design-system/components/dist/types/types';
import { forceHoverState, getPlaygroundPseudoStatesMarkup, setContentWithDesignSystem } from '../../helpers';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const component = 'select-wrapper-dropdown';

const scenario = async (page: Page): Promise<void> => {
  const head = `<style>
  #app { display: grid; grid-template-columns: repeat(2, 50%); }
  p-select-wrapper-dropdown { --p-internal-dropdown-position: 'static'; }
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

      const dropdownMultiline = getDropdown('multiline', theme);
      (dropdownMultiline as any).selectRef.innerHTML = Array.from(Array(2))
        .map(
          (_, idx) =>
            `<option>Option multiline ${
              idx + 1
            } Multiline options could be quite long, especially on smaller screens. Let's check if the height of the option is displaying correctly. Also, the selected icon checkmark should show up on the right of the text, aligned to the top.
                </option>`
        )
        .join('');

      return [
        dropdownDefault,
        dropdownDisabled,
        dropdownOptGroup,
        dropdownScrollable,
        dropdownDirectionUp,
        dropdownFilter,
        dropdownMultiline,
      ];
    };

    document.querySelector('.playground.light').append(...getMarkup('light'));
    document.querySelector('.playground.dark').append(...getMarkup('dark'));
  });

  // visually hide button and span since it produces some absolute borders
  await page.evaluate(() => {
    document.querySelectorAll('p-select-wrapper-dropdown').forEach((el) => {
      const btn: HTMLElement = el.shadowRoot.querySelector('button,span');
      if (btn) {
        btn.style.display = 'none';
      }
    });
  });

  await forceHoverState(page, '.hover p-select-wrapper-dropdown >>> li:first-child');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on select-wrapper-dropdown component for viewport ${viewportWidthM}`, async ({
    page,
  }) => {
    await scenario(page);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states.png`);
  });
});
