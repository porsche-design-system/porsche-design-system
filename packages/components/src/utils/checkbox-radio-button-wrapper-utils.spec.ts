import { addChangeListener, changeHandler } from './checkbox-radio-button-wrapper-utils';

describe('changeHandler()', () => {
  it('should use correct selector for input type="radio" and set display = none and immediately set it back to default value', () => {
    const spyQuerySelectorAll = jest.spyOn(document, 'querySelectorAll');

    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.name = 'some-radio';

    const radio2 = document.createElement('input');
    radio2.type = 'radio';
    radio2.name = 'some-radio';

    const radio3 = document.createElement('input');
    radio3.type = 'radio';
    radio3.name = 'some-other-radio';

    const textRadio = document.createElement('input');
    textRadio.type = 'text';
    textRadio.name = 'some-radio';

    expect(radio1.style.display).toBe('');
    expect(radio2.style.display).toBe('');
    expect(radio3.style.display).toBe('');
    expect(textRadio.style.display).toBe('');

    radio1.style.display = 'none';
    radio2.style.display = 'none';
    radio3.style.display = 'none';
    textRadio.style.display = 'none';

    document.body.appendChild(radio1);
    document.body.appendChild(radio2);
    document.body.appendChild(radio3);
    document.body.appendChild(textRadio);

    changeHandler({
      target: { name: 'some-radio', type: 'radio' },
    } as unknown as Event & { target: HTMLInputElement });

    expect(spyQuerySelectorAll).toBeCalledWith('input[type=radio][name="some-radio"]');
    expect(radio1.style.display).toBe('');
    expect(radio2.style.display).toBe('');
    expect(radio3.style.display).toBe('none');
    expect(textRadio.style.display).toBe('none');
  });
  it('should use correct selector for input type="checkbox" and set display = none and immediately set it back to default value', () => {
    const spyQuerySelectorAll = jest.spyOn(document, 'querySelectorAll');

    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.name = 'some-checkbox';

    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.name = 'some-checkbox';

    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.name = 'some-other-checkbox';

    const textCheckbox = document.createElement('input');
    textCheckbox.type = 'text';
    textCheckbox.name = 'some-checkbox';

    expect(checkbox1.style.display).toBe('');
    expect(checkbox2.style.display).toBe('');
    expect(checkbox3.style.display).toBe('');
    expect(textCheckbox.style.display).toBe('');

    checkbox1.style.display = 'none';
    checkbox2.style.display = 'none';
    checkbox3.style.display = 'none';
    textCheckbox.style.display = 'none';

    document.body.appendChild(checkbox1);
    document.body.appendChild(checkbox2);
    document.body.appendChild(checkbox3);
    document.body.appendChild(textCheckbox);

    changeHandler({ target: { name: 'some-checkbox', type: 'checkbox' } } as unknown as Event & {
      target: HTMLInputElement;
    });

    expect(spyQuerySelectorAll).toBeCalledWith('input[type=checkbox][name="some-checkbox"]');
    expect(checkbox1.style.display).toBe('');
    expect(checkbox2.style.display).toBe('');
    expect(checkbox3.style.display).toBe('none');
    expect(textCheckbox.style.display).toBe('none');
  });
});

describe('addChangeListener()', () => {
  it('should call addEventListener() with correct parameters', () => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'some-name';
    const spy = jest.spyOn(radio, 'addEventListener');

    addChangeListener(radio);
    expect(spy).toBeCalledWith('change', changeHandler);
  });
});
