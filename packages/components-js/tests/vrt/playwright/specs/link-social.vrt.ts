import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';

const component = 'link-social';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');

      const head = `
        <style>
          #app { display: grid; grid-template-columns: repeat(2, 50%); }
          p-link-social { margin-right: 1rem; margin-top: 1rem; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-link-social theme="${theme}" href="https://www.porsche.com/">Fallback</p-link-social>
        <p-link-social theme="${theme}" href="https://www.porsche.com/" hide-label="true">Fallback</p-link-social>
        <p-link-social theme="${theme}" href="https://www.facebook.com/" icon="logo-facebook">Facebook</p-link-social>
        <p-link-social theme="${theme}" href="https://www.facebook.com/" icon="logo-facebook" hide-label="true">Facebook</p-link-social>
        <p-link-social theme="${theme}" href="https://www.google.com/" icon="logo-google">Google</p-link-social>
        <p-link-social theme="${theme}" href="https://www.google.com/" icon="logo-google" hide-label="true">Google</p-link-social>
        <p-link-social theme="${theme}" href="https://www.instagram.com/" icon="logo-instagram">Instagram</p-link-social>
        <p-link-social theme="${theme}" href="https://www.instagram.com/" icon="logo-instagram" hide-label="true">Instagram</p-link-social>
        <p-link-social theme="${theme}" href="https://www.kakaocorp.com/" icon="logo-kakaotalk">KakaoTalk</p-link-social>
        <p-link-social theme="${theme}" href="https://www.kakaocorp.com/" icon="logo-kakaotalk" hide-label="true">KakaoTalk</p-link-social>
        <p-link-social theme="${theme}" href="https://www.linkedin.com/" icon="logo-linkedin">LinkedIn</p-link-social>
        <p-link-social theme="${theme}" href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true">LinkedIn</p-link-social>
        <p-link-social theme="${theme}" href="https://www.naver.com/" icon="logo-naver">Naver</p-link-social>
        <p-link-social theme="${theme}" href="https://www.naver.com/" icon="logo-naver" hide-label="true">Naver</p-link-social>
        <p-link-social theme="${theme}" href="https://www.pinterest.com/" icon="logo-pinterest">Pinterest</p-link-social>
        <p-link-social theme="${theme}" href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true">Pinterest</p-link-social>
        <p-link-social theme="${theme}" href="https://www.reddit.com/" icon="logo-reddit">Reddit</p-link-social>
        <p-link-social theme="${theme}" href="https://www.reddit.com/" icon="logo-reddit" hide-label="true">Reddit</p-link-social>
        <p-link-social theme="${theme}" href="https://www.tiktok.com/" icon="logo-tiktok">TikTok</p-link-social>
        <p-link-social theme="${theme}" href="https://www.tiktok.com/" icon="logo-tiktok" hide-label="true">TikTok</p-link-social>
        <p-link-social theme="${theme}" href="https://www.twitter.com/" icon="logo-twitter">Twitter</p-link-social>
        <p-link-social theme="${theme}" href="https://www.twitter.com/" icon="logo-twitter" hide-label="true">Twitter</p-link-social>
        <p-link-social theme="${theme}" href="https://www.wechat.com/" icon="logo-wechat">Wechat</p-link-social>
        <p-link-social theme="${theme}" href="https://www.wechat.com/" icon="logo-wechat" hide-label="true">Wechat</p-link-social>
        <p-link-social theme="${theme}" href="https://wa.me/491525557912" icon="logo-whatsapp">Whatsapp</p-link-social>
        <p-link-social theme="${theme}" href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true">Whatsapp</p-link-social>
        <p-link-social theme="${theme}" href="https://www.xing.com" icon="logo-xing">XING</p-link-social>
        <p-link-social theme="${theme}" href="https://www.xing.com" icon="logo-xing" hide-label="true">XING</p-link-social>
        <p-link-social theme="${theme}" href="https://www.youtube.com" icon="logo-youtube">Youtube</p-link-social>
        <p-link-social theme="${theme}" href="https://www.youtube.com" icon="logo-youtube" hide-label="true">Youtube</p-link-social>
        <p-link-social theme="${theme}" icon="logo-youtube"><a href="https://www.youtube.com">Slotted Youtube Anchor</a></p-link-social>
        <p-link-social theme="${theme}" icon="logo-youtube" hide-label="true"><a href="https://www.youtube.com">Slotted Youtube Anchor</a></p-link-social>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-link-social >>> a');
      await forceHoverState(page, '.hover p-link-social >>> span');
      await forceFocusState(page, '.focus p-link-social'); // native outline should not be visible
      await forceFocusState(page, '.focus p-link-social >>> a');
      await forceFocusState(page, '.focus p-link-social a');
      await forceFocusHoverState(page, '.focus-hover p-link-social >>> a');
      await forceHoverState(page, '.focus-hover p-link-social >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceFocusHoverState(page, '.focus-hover p-link-social a');

      // TODO: scenario like style="width: 200px" on parent missing?

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
