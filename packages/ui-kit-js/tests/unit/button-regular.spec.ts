import { newSpecPage } from '@stencil/core/testing';
import { ButtonRegular } from '../../src/components/action/button-regular/button-regular';

describe('Component <p-button-regular>', () => {
  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular>Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-button-regular')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-button-regular')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render correctly in link mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ButtonRegular],
      html: `<p-button-regular href="https://ui.porsche.com">Button regular</p-button-regular>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('a')).toBeTruthy();
  });

  // it('should emit on click', async() => {
  //   const page = await newSpecPage({
  //     components: [ButtonRegular],
  //     html: `<p-button-regular>Button regular</p-button-regular>`,
  //   });
  //   const button = page.root.querySelector('button');
  //   const buttonSpy = jest.fn();
  //   page.win.addEventListener('onClick', buttonSpy);
  //   await button.click();
  //   await page.waitForChanges();
  //   expect(buttonSpy).toHaveBeenCalled();
  //   // [0][0] - first argument of the first call
  //   expect(buttonSpy.mock.calls[0][0].detail).toEqual(Event);
  // });
});

