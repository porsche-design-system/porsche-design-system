import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

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

        const head = `<style type="text/css">p-link-social { margin-right: 16px; margin-top: 16px; }</style>`;

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-link-social theme="${theme}" href="https://www.facebook.com/" icon="logo-facebook">Facebook</p-link-social>
          <p-link-social theme="${theme}" href="https://www.google.com/" icon="logo-google">Google</p-link-social>
          <p-link-social theme="${theme}" href="https://www.instagram.com/" icon="logo-instagram">Instagram</p-link-social>
          <p-link-social theme="${theme}" href="https://www.linkedin.com/" icon="logo-linkedin">LinkedIn</p-link-social>
          <p-link-social theme="${theme}" href="https://www.pinterest.com/" icon="logo-pinterest">Pinterest</p-link-social>
          <p-link-social theme="${theme}" href="https://www.twitter.com/" icon="logo-twitter">Twitter</p-link-social>
          <p-link-social theme="${theme}" href="https://www.wechat.com/" icon="logo-wechat">Wechat</p-link-social>
          <p-link-social theme="${theme}" href="https://wa.me/491525557912" icon="logo-whatsapp">Whatsapp</p-link-social>
          <p-link-social theme="${theme}" href="https://www.xing.com" icon="logo-xing">XING</p-link-social>
          <p-link-social theme="${theme}" href="https://www.youtube.com" icon="logo-youtube">Youtube</p-link-social>
          <p-link-social theme="${theme}" icon="logo-youtube"><a href="https://www.youtube.com">Slotted Youtube Anchor</a></p-link-social>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

        await forceHoveredState(page, '.hovered > p-link-social >>> a');
        await forceHoveredState(page, '.hovered > p-link-social >>> span');
        await forceFocusedState(page, '.focused > p-link-social >>> a');
        await forceFocusedState(page, '.focused > p-link-social >>> span');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link-social >>> a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-link-social >>> span');
      })
    ).toBeFalsy();
  });
});
