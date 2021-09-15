import {
  getVisualRegressionContentWrapperTester,
  getVisualRegressionStatesTester,
  vrtTest,
  testOptions,
  VisualRegressionTester,
} from '@porsche-design-system/shared/testing';

describe('Modal', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression for basic modal', async () => {
    expect(await vrt.test('modal-basic', () => vrt.goTo('/#modal-basic'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for scrollable modal', async () => {
    expect(
      await vrt.test(
        'modal-scrollable',
        async () => {
          await vrt.goTo('/#modal-scrollable');
          await vrt.getPage().evaluate(async () => {
            await (window as any).componentsReady();
            // screenshot triggers resize, so we need to scroll the modal after that
            window.addEventListener('resize', () => {
              document.querySelector('p-modal').scrollTo(0, 10000);
            });
          });
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for prefixed modal', async () => {
    expect(await vrtTest(getVisualRegressionStatesTester(), 'modal-prefixed', '/#modal-prefixed')).toBeFalsy();
  });

  it('should have no visual regression for fullscreen modal', async () => {
    expect(await vrtTest(vrt, 'modal-fullscreen', '/#modal-fullscreen')).toBeFalsy();
  });

  it('should have no visual regression for fullscreen breakpoint modal', async () => {
    expect(await vrtTest(vrt, 'modal-fullscreen-breakpoint', '/#modal-fullscreen-breakpoint')).toBeFalsy();

    expect(
      await vrt.test(
        'modal-fullscreen-breakpoint-m',
        async () => {
          await vrt.goTo('/#modal-fullscreen-breakpoint');
          await vrt.getPage().evaluate(async () => {
            await (window as any).componentsReady();
            (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
          });
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
