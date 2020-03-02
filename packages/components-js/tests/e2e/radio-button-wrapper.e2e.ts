import { newE2EPage } from '@stencil/core/testing';

describe('radio-button-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);
    const el = await page.find('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
    expect(el).not.toBeNull();
  });

  it('should check radio-button when input is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const fakeRadio1 = await page.find('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await page.find('#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const input1 = await page.find('#radio-1 > input[type="radio"]');
    const input2 = await page.find('#radio-2 > input[type="radio"]');

    expect(fakeRadio1).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await input1.click();

    expect(fakeRadio1).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await input2.click();

    expect(fakeRadio1).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
    expect(fakeRadio2).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should check radio-button when label text is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const fakeRadio1 = await page.find('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await page.find('#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const labelText1 = await page.find('#radio-1 >>> .p-radio-button-wrapper__label-text');
    const labelText2 = await page.find('#radio-2 >>> .p-radio-button-wrapper__label-text');

    expect(fakeRadio1).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await labelText1.click();

    expect(fakeRadio1).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await labelText2.click();

    expect(fakeRadio1).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
    expect(fakeRadio2).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should check radio-button when radio-button is changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const getFakeRadio1 = async () => {
      const radioButtonWrapper = await page.find('#radio-1');
      return radioButtonWrapper.shadowRoot.querySelector('.p-radio-button-wrapper__fake-radio-button');
    };

    const getFakeRadio2 = async () => {
      const radioButtonWrapper = await page.find('#radio-2');
      return radioButtonWrapper.shadowRoot.querySelector('.p-radio-button-wrapper__fake-radio-button');
    };

    const fakeRadio1Classlist = async () => (await getFakeRadio1()).classList;
    const fakeRadio2Classlist = async () => (await getFakeRadio2()).classList;

    expect(await getFakeRadio1()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await page.evaluate(() => {
      document.querySelectorAll('input')[0].checked = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await fakeRadio1Classlist()).contains('p-radio-button-wrapper__fake-radio-button--checked')) {
      await page.waitFor(10);
    }

    expect(await getFakeRadio1()).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await page.evaluate(() => {
      document.querySelectorAll('input')[1].checked = true;
    });

    while((await fakeRadio2Classlist()).contains('p-radio-button-wrapper__fake-radio-button--checked')) {
      await page.waitFor(10);
    }

    expect(await getFakeRadio2()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should disable radio-button when radio-button is set disabled programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const getFakeRadio1 = async () => {
      const radioButtonWrapper = await page.find('#radio-1');
      return radioButtonWrapper.shadowRoot.querySelector('.p-radio-button-wrapper__fake-radio-button');
    };

    const fakeRadio1Classlist = async () => (await getFakeRadio1()).classList;

    expect(await getFakeRadio1()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await fakeRadio1Classlist()).contains('p-radio-button-wrapper__fake-radio-button--disabled')) {
      await page.waitFor(10);
    }

    expect(await getFakeRadio1()).toHaveClass('p-radio-button-wrapper__fake-radio-button--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    while((await fakeRadio1Classlist()).contains('p-radio-button-wrapper__fake-radio-button--disabled')) {
      await page.waitFor(10);
    }

    expect(await getFakeRadio1()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--disabled');
  });
});
