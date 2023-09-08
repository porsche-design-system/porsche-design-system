import { expect, type Page, test } from '@playwright/test';
import { openAllPopover, type PrefersColorScheme, setContentWithDesignSystem } from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'popover';
const viewportWidth = 1760;

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const getPopover = (direction: string, length: number = 1): string => {
    return `<p-popover direction=${direction}>
    ${Array.from(Array(length))
      .map(() => `<div>Direction ${direction}</div>`)
      .join('\n')}
</p-popover>`;
  };

  const markup =
    () => `<div style="position: relative; height: 800px; outline: 1rem solid rgba(0, 0, 255, 0.1); outline-offset: -1rem">
  <!--   Top Left to right   -->
  <span style="position: absolute; top: 1.5rem; left: 1rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; top: 2rem; left: 15rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; top: 3rem; left: 30rem">
   ${getPopover('right', 3)}
  </span>
  <!--   Bottom Left to right   -->
  <span style="position: absolute; bottom: 1.5rem; left: 1rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; bottom: 2rem; left: 15rem">
   ${getPopover('right', 3)}
  </span>
  <span style="position: absolute; bottom: 3rem; left: 30rem">
   ${getPopover('right', 3)}
  </span>
  <!--   Top  Right to left   -->
  <span style="position: absolute; top: 1.5rem; right: 1rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; top: 2rem; right: 15rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; top: 3rem; right: 30rem">
   ${getPopover('left', 3)}
  </span>
  <!--   Bottom  Right to left   -->
  <span style="position: absolute; bottom: 1.5rem; right: 1rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; bottom: 2rem; right: 15rem">
   ${getPopover('left', 3)}
  </span>
  <span style="position: absolute; bottom: 3rem; right: 30rem">
   ${getPopover('left', 3)}
  </span>
  <!--    Top Center-->
  <span style="position: absolute; top: 4.5rem; right: 50rem">
   ${getPopover('top')}
  </span>
  <span style="position: absolute; top: 4rem; right: 65rem">
   ${getPopover('top')}
  </span>
  <!--    Bottom Center-->
  <span style="position: absolute; bottom: 4.5rem; right: 50rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; bottom: 4rem; right: 65rem">
   ${getPopover('bottom')}
  </span>
  <!--    Left Center-->
  <span style="position: absolute; top: 10rem; left: 10rem">
   ${getPopover('left')}
  </span>
  <span style="position: absolute; top: 15rem; left: 9rem">
   ${getPopover('left')}
  </span>
  <!--    Right Center-->
  <span style="position: absolute; top: 10rem; right: 10.5rem">
   ${getPopover('right')}
  </span>
  <span style="position: absolute; top: 15rem; right: 9rem">
   ${getPopover('right')}
  </span>

  <!--    x-axis left -->
  <span style="position: absolute; top: 20rem; left: 1.5rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 25rem; left: 2rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 35rem; left: 4rem">
   ${getPopover('bottom')}
  </span>
  <!--    x-axis right -->
  <span style="position: absolute; top: 20rem; right: 1.5rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 25rem; right: 2rem">
   ${getPopover('bottom')}
  </span>
  <span style="position: absolute; top: 35rem; right: 4rem">
   ${getPopover('bottom')}
  </span>

  <!--   Center  -->
  <span style="position: absolute; top: 40vh; right: 50vw">
    <p-popover>
      <div>Direction bottom</div>
      <div>to overlap</div>
      <div>next popover</div>
    </p-popover>
  </span>
  <span style="position: absolute; top: 50vh; right: 50vw">
   ${getPopover('bottom')}
  </span>
</div>`;

  await setContentWithDesignSystem(page, markup());
  await page.setViewportSize({ width: viewportWidth, height: 600 });
  await openAllPopover(page);
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on popover-overview for viewport ${viewportWidth}`, async ({ page }) => {
    await scenario(page, 'light');
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}-overview.png`);
  });
});
