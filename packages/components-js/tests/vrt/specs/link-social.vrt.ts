import { getVisualRegressionStatesTester, getVisualRegressionTester, testOptions } from '../helpers';
import {
  CSS_ANIMATION_DURATION,
  FOCUSED_HOVERED_STATE,
  FOCUSED_STATE,
  forceStateOnElement,
  HOVERED_STATE,
  setContentWithDesignSystem,
} from '../../e2e/helpers';

describe('Link Social', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'link-social',
        async () => {
          await vrt.goTo('/#link-social');
        },
        testOptions
      )
    ).toBeFalsy();
  });
  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('link-social-states', async () => {
        const page = await vrt.getPage();

        const head = `
          <link rel="stylesheet" href="styles.css" />
          <style type="text/css">p-link-social { margin-right: 16px; margin-top: 16px; }</style>`;

        const body = `
          <div class="playground light">
            <p-link-social id="link-social-facebook-hovered" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-google-hovered" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-instagram-hovered" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-linkedin-hovered" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-pinterest-hovered" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-twitter-hovered" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-wechat-hovered" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-whatsapp-hovered" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-xing-hovered" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-youtube-hovered" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>
          <div class="playground dark">
            <p-link-social id="link-social-dark-facebook-hovered" theme="dark" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-dark-google-hovered" theme="dark" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-dark-instagram-hovered" theme="dark" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-dark-linkedin-hovered" theme="dark" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-dark-pinterest-hovered" theme="dark" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-dark-twitter-hovered" theme="dark" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-dark-wechat-hovered" theme="dark" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-dark-whatsapp-hovered" theme="dark" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-dark-xing-hovered" theme="dark" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-dark-youtube-hovered" theme="dark" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>
          <div class="playground light">
            <p-link-social id="link-social-facebook-focused" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-google-focused" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-instagram-focused" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-linkedin-focused" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-pinterest-focused" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-twitter-focused" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-wechat-focused" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-whatsapp-focused" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-xing-focused" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-youtube-focused" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>
          <div class="playground dark">
            <p-link-social id="link-social-dark-facebook-focused" theme="dark" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-dark-google-focused" theme="dark" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-dark-instagram-focused" theme="dark" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-dark-linkedin-focused" theme="dark" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-dark-pinterest-focused" theme="dark" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-dark-twitter-focused" theme="dark" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-dark-wechat-focused" theme="dark" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-dark-whatsapp-focused" theme="dark" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-dark-xing-focused" theme="dark" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-dark-youtube-focused" theme="dark" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>
          <div class="playground light">
            <p-link-social id="link-social-facebook-hovered-focused" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-google-hovered-focused" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-instagram-hovered-focused" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-linkedin-hovered-focused" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-pinterest-hovered-focused" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-twitter-hovered-focused" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-wechat-hovered-focused" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-whatsapp-hovered-focused" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-xing-hovered-focused" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-youtube-hovered-focused" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>
          <div class="playground dark">
            <p-link-social id="link-social-dark-facebook-hovered-focused" theme="dark" href="https://www.facebook.com/" icon="logo-facebook"target="_blank" rel="nofollow noopener">Facebook</p-link-social>
            <p-link-social id="link-social-dark-google-hovered-focused" theme="dark" href="https://www.google.com/" icon="logo-google"target="_blank" rel="nofollow noopener">Google</p-link-social>
            <p-link-social id="link-social-dark-instagram-hovered-focused" theme="dark" href="https://www.instagram.com/" icon="logo-instagram"target="_blank" rel="nofollow noopener">Instagram</p-link-social>
            <p-link-social id="link-social-dark-linkedin-hovered-focused" theme="dark" href="https://www.linkedin.com/" icon="logo-linkedin"target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>
            <p-link-social id="link-social-dark-pinterest-hovered-focused" theme="dark" href="https://www.pinterest.com/" icon="logo-pinterest"target="_blank" rel="nofollow noopener">Pinterest</p-link-social>
            <p-link-social id="link-social-dark-twitter-hovered-focused" theme="dark" href="https://www.twitter.com/" icon="logo-twitter"target="_blank" rel="nofollow noopener">Twitter</p-link-social>
            <p-link-social id="link-social-dark-wechat-hovered-focused" theme="dark" href="https://www.wechat.com/" icon="logo-wechat"target="_blank" rel="nofollow noopener">Wechat</p-link-social>
            <p-link-social id="link-social-dark-whatsapp-hovered-focused" theme="dark" href="https://wa.me/491525557912" icon="logo-whatsapp"target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>
            <p-link-social id="link-social-dark-xing-hovered-focused" theme="dark" href="https://www.xing.com" icon="logo-xing"target="_blank" rel="nofollow noopener">XING</p-link-social>
            <p-link-social id="link-social-dark-youtube-hovered-focused" theme="dark" href="https://www.youtube.com" icon="logo-youtube"target="_blank" rel="nofollow noopener">Youtube</p-link-social>
          </div>`;

        await setContentWithDesignSystem(page, body, { injectIntoHead: head });

        await forceStateOnElement(page, '#link-social-facebook-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-google-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-instagram-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-linkedin-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-pinterest-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-twitter-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-wechat-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-whatsapp-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-xing-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-youtube-hovered >>> a', HOVERED_STATE);

        await forceStateOnElement(page, '#link-social-facebook-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-google-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-instagram-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-linkedin-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-pinterest-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-twitter-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-wechat-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-whatsapp-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-xing-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-youtube-focused >>> a', FOCUSED_STATE);

        await forceStateOnElement(page, '#link-social-facebook-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-google-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-instagram-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-linkedin-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-pinterest-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-twitter-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-wechat-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-whatsapp-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-xing-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-youtube-hovered-focused >>> a', FOCUSED_HOVERED_STATE);

        await forceStateOnElement(page, '#link-social-dark-facebook-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-google-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-instagram-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-linkedin-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-pinterest-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-twitter-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-wechat-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-whatsapp-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-xing-hovered >>> a', HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-youtube-hovered >>> a', HOVERED_STATE);

        await forceStateOnElement(page, '#link-social-dark-facebook-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-google-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-instagram-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-linkedin-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-pinterest-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-twitter-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-wechat-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-whatsapp-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-xing-focused >>> a', FOCUSED_STATE);
        await forceStateOnElement(page, '#link-social-dark-youtube-focused >>> a', FOCUSED_STATE);

        await forceStateOnElement(page, '#link-social-dark-facebook-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-google-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-instagram-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-linkedin-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-pinterest-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-twitter-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-wechat-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-whatsapp-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-xing-hovered-focused >>> a', FOCUSED_HOVERED_STATE);
        await forceStateOnElement(page, '#link-social-dark-youtube-hovered-focused >>> a', FOCUSED_HOVERED_STATE);

        //wait for all style transitions to finish
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      })
    ).toBeFalsy();
  });
});
