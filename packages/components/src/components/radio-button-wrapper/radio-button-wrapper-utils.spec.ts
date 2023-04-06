import { addChangeListener, changeHandler } from './radio-button-wrapper-utils';

describe('changeHandler()', () => {
  it('should use correct selector and set display = none and immediately set it back to default value', () => {
    const spyQuerySelectorAll = jest.spyOn(document, 'querySelectorAll');

    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.name = 'some-name';

    const radio2 = document.createElement('input');
    radio2.type = 'radio';
    radio2.name = 'some-name';

    const radio3 = document.createElement('input');
    radio3.type = 'radio';
    radio3.name = 'some-other-name';

    const text = document.createElement('input');
    text.type = 'text';
    text.name = 'some-name';

    expect(radio1.style.display).toBe('');
    expect(radio2.style.display).toBe('');
    expect(radio3.style.display).toBe('');
    expect(text.style.display).toBe('');

    radio1.style.display = 'none';
    radio2.style.display = 'none';
    radio3.style.display = 'none';
    text.style.display = 'none';

    document.body.appendChild(radio1);
    document.body.appendChild(radio2);
    document.body.appendChild(radio3);
    document.body.appendChild(text);

    changeHandler({ target: { name: 'some-name' } } as unknown as Event);

    expect(spyQuerySelectorAll).toBeCalledWith('input[type=radio][name="some-name"]');
    expect(radio1.style.display).toBe('');
    expect(radio2.style.display).toBe('');
    expect(radio3.style.display).toBe('none');
    expect(text.style.display).toBe('none');
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
