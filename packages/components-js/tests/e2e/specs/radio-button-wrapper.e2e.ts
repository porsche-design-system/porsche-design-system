import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('radio-button-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const el = await page.find('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
    expect(el).not.toBeNull();
  });

  it('should add aria-label to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const input = await page.find('p-radio-button-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label" message="Some error message" state="error">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const input = await page.find('p-radio-button-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent = await page.find('p-radio-button-wrapper');
    const getLabelText = async () => {
      return radioComponent.shadowRoot.querySelector('.p-radio-button-wrapper__label-text');
    };

    expect(await getLabelText()).toBeNull();

    radioComponent.setProperty('label', 'Some label');

    await page.waitForChanges();

    expect(await getLabelText()).not.toBeNull();

  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent = await page.find('p-radio-button-wrapper');
    const getMessage = async () => {
      return radioComponent.shadowRoot.querySelector('.p-radio-button-wrapper__message');
    };

    const getInput = async () => {
      return radioComponent.find('input');
    };

    expect(await getMessage()).toBeNull();

    radioComponent.setProperty('state', 'error');
    radioComponent.setProperty('message', 'Some error message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttribute('role', 'alert');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some error message');

    radioComponent.setProperty('state', 'success');
    radioComponent.setProperty('message', 'Some success message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some success message');

    radioComponent.setProperty('state', 'none');
    radioComponent.setProperty('message', '');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();
    expect(await getInput()).toEqualAttribute('aria-label','Some label');

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

    await page.waitForChanges();

    expect(fakeRadio1).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await input2.click();

    await page.waitForChanges();

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

    await page.waitForChanges();

    expect(fakeRadio1).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await labelText2.click();

    await page.waitForChanges();

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

    expect(await getFakeRadio1()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getFakeRadio2()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await page.evaluate(() => {
      document.querySelectorAll('input')[0].checked = true;
    });

    await page.waitForChanges();

    expect(await getFakeRadio1()).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');

    await page.evaluate(() => {
      document.querySelectorAll('input')[1].checked = true;
    });

    await page.waitForChanges();

    expect(await getFakeRadio1()).not.toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getFakeRadio2()).toHaveClass('p-radio-button-wrapper__fake-radio-button--checked');
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

  describe('hover state', () => {
    const getBoxShadow = async (page: E2EPage) => {
      const fakeRadioButton = await page.find('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
      const styles = await fakeRadioButton.getComputedStyle();
      return styles.boxShadow;
    };

    it('should change box-shadow color when fake radio button is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

      const fakeRadioButton = await page.find('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeRadioButton.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake radio button when label text is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

      const labelText = await page.find('p-radio-button-wrapper >>> .p-radio-button-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await labelText.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });
  });
});
