import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  type GetMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'link-social';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      p-link-social { margin-right: 1rem; margin-top: 1rem; }
    </style>`;

  const getElementsMarkup: GetMarkup = () => `
    <p-link-social href="https://www.porsche.com/">Fallback</p-link-social>
    <p-link-social href="https://www.porsche.com/" hide-label="true">Fallback</p-link-social>
    <p-link-social href="https://www.facebook.com/" icon="logo-facebook">Facebook</p-link-social>
    <p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true">Facebook</p-link-social>
    <p-link-social href="https://www.google.com/" icon="logo-google">Google</p-link-social>
    <p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true">Google</p-link-social>
    <p-link-social href="https://www.instagram.com/" icon="logo-instagram">Instagram</p-link-social>
    <p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true">Instagram</p-link-social>
    <p-link-social href="https://www.kakaocorp.com/" icon="logo-kakaotalk">KakaoTalk</p-link-social>
    <p-link-social href="https://www.kakaocorp.com/" icon="logo-kakaotalk" hide-label="true">KakaoTalk</p-link-social>
    <p-link-social href="https://www.linkedin.com/" icon="logo-linkedin">LinkedIn</p-link-social>
    <p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true">LinkedIn</p-link-social>
    <p-link-social href="https://www.naver.com/" icon="logo-naver">Naver</p-link-social>
    <p-link-social href="https://www.naver.com/" icon="logo-naver" hide-label="true">Naver</p-link-social>
    <p-link-social href="https://www.pinterest.com/" icon="logo-pinterest">Pinterest</p-link-social>
    <p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true">Pinterest</p-link-social>
    <p-link-social href="https://www.reddit.com/" icon="logo-reddit">Reddit</p-link-social>
    <p-link-social href="https://www.reddit.com/" icon="logo-reddit" hide-label="true">Reddit</p-link-social>
    <p-link-social href="https://www.tiktok.com/" icon="logo-tiktok">TikTok</p-link-social>
    <p-link-social href="https://www.tiktok.com/" icon="logo-tiktok" hide-label="true">TikTok</p-link-social>
    <p-link-social href="https://www.twitter.com/" icon="logo-twitter">Twitter</p-link-social>
    <p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true">Twitter</p-link-social>
    <p-link-social href="https://www.wechat.com/" icon="logo-wechat">Wechat</p-link-social>
    <p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true">Wechat</p-link-social>
    <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp">Whatsapp</p-link-social>
    <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true">Whatsapp</p-link-social>
    <p-link-social href="https://www.xing.com" icon="logo-xing">XING</p-link-social>
    <p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true">XING</p-link-social>
    <p-link-social href="https://www.youtube.com" icon="logo-youtube">Youtube</p-link-social>
    <p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true">Youtube</p-link-social>
    <p-link-social icon="logo-youtube"><a href="https://www.youtube.com">Slotted Youtube Anchor</a></p-link-social>
    <p-link-social icon="logo-youtube" hide-label="true"><a href="https://www.youtube.com">Slotted Youtube Anchor</a></p-link-social>`;

  await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-social >>> a');
  await forceHoverState(page, '.hover p-link-social >>> span');
  await forceFocusState(page, '.focus p-link-social'); // native outline should not be visible
  await forceFocusState(page, '.focus p-link-social >>> a');
  await forceFocusState(page, '.focus p-link-social a');
  await forceFocusHoverState(page, '.focus-hover p-link-social >>> a');
  await forceHoverState(page, '.focus-hover p-link-social >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
  await forceFocusHoverState(page, '.focus-hover p-link-social a');

  // TODO: scenario like style="width: 200px" on parent missing?
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test.skip(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
