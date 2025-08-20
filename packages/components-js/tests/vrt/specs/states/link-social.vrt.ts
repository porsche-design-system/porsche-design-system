import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/styles';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'link-social';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-link-social href="https://porsche.com">Fallback</p-link-social>
    <p-link-social href="https://porsche.com" hide-label="true">Fallback</p-link-social>
    <p-link-social href="https://facebook.com" icon="logo-facebook">Facebook</p-link-social>
    <p-link-social href="https://facebook.com" icon="logo-facebook" hide-label="true">Facebook</p-link-social>
    <p-link-social href="https://google.com" icon="logo-google">Google</p-link-social>
    <p-link-social href="https://google.com" icon="logo-google" hide-label="true">Google</p-link-social>
    <p-link-social href="https://instagram.com" icon="logo-instagram">Instagram</p-link-social>
    <p-link-social href="https://instagram.com" icon="logo-instagram" hide-label="true">Instagram</p-link-social>
    <p-link-social href="https://kakaocorp.com" icon="logo-kakaotalk">KakaoTalk</p-link-social>
    <p-link-social href="https://kakaocorp.com" icon="logo-kakaotalk" hide-label="true">KakaoTalk</p-link-social>
    <p-link-social href="https://linkedin.com" icon="logo-linkedin">LinkedIn</p-link-social>
    <p-link-social href="https://linkedin.com" icon="logo-linkedin" hide-label="true">LinkedIn</p-link-social>
    <p-link-social href="https://naver.com" icon="logo-naver">Naver</p-link-social>
    <p-link-social href="https://naver.com" icon="logo-naver" hide-label="true">Naver</p-link-social>
    <p-link-social href="https://pinterest.com" icon="logo-pinterest">Pinterest</p-link-social>
    <p-link-social href="https://pinterest.com" icon="logo-pinterest" hide-label="true">Pinterest</p-link-social>
    <p-link-social href="https://reddit.com" icon="logo-reddit">Reddit</p-link-social>
    <p-link-social href="https://reddit.com" icon="logo-reddit" hide-label="true">Reddit</p-link-social>
    <p-link-social href="https://tiktok.com" icon="logo-tiktok">TikTok</p-link-social>
    <p-link-social href="https://tiktok.com" icon="logo-tiktok" hide-label="true">TikTok</p-link-social>
    <p-link-social href="https://twitter.com" icon="logo-twitter">Twitter</p-link-social>
    <p-link-social href="https://twitter.com" icon="logo-twitter" hide-label="true">Twitter</p-link-social>
    <p-link-social href="https://www.wechat.com" icon="logo-wechat">Wechat</p-link-social>
    <p-link-social href="https://www.wechat.com" icon="logo-wechat" hide-label="true">Wechat</p-link-social>
    <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp">Whatsapp</p-link-social>
    <p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true">Whatsapp</p-link-social>
    <p-link-social href="https://xing.com" icon="logo-xing">XING</p-link-social>
    <p-link-social href="https://xing.com" icon="logo-xing" hide-label="true">XING</p-link-social>
    <p-link-social href="https://youtube.com" icon="logo-youtube">Youtube</p-link-social>
    <p-link-social href="https://youtube.com" icon="logo-youtube" hide-label="true">Youtube</p-link-social>
    <p-link-social icon="logo-youtube"><a href="https://youtube.com">Slotted Youtube Anchor</a></p-link-social>
    <p-link-social icon="logo-youtube" hide-label="true"><a href="https://youtube.com">Slotted Youtube Anchor</a></p-link-social>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-social >>> a');
  await forceHoverState(page, '.hover p-link-social >>> span');
  await forceFocusVisibleState(page, '.focus p-link-social'); // native outline should not be visible
  await forceFocusVisibleState(page, '.focus p-link-social >>> a');
  await forceFocusVisibleState(page, '.focus p-link-social a');
  await forceFocusHoverState(page, '.focus-hover p-link-social >>> a');
  await forceHoverState(page, '.focus-hover p-link-social >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
  await forceFocusHoverState(page, '.focus-hover p-link-social a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${theme}.png`);
    });
  });

  schemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });
  });
});
