import { addChangeListener, changeHandler } from './radio-button-wrapper-utils';

describe('changeHandler()', () => {
  it('should set and immediately remove hidden attribute on input type=radio with same name', () => {
    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.name = 'some-name';
    const spySetAttribute1 = jest.spyOn(radio1, 'setAttribute');
    const spyRemoveAttribute1 = jest.spyOn(radio1, 'removeAttribute');

    const radio2 = document.createElement('input');
    radio2.type = 'radio';
    radio2.name = 'some-name';
    const spySetAttribute2 = jest.spyOn(radio2, 'setAttribute');
    const spyRemoveAttribute2 = jest.spyOn(radio2, 'removeAttribute');

    const radio3 = document.createElement('input');
    radio3.type = 'radio';
    radio3.name = 'some-other-name';
    const spySetAttribute3 = jest.spyOn(radio3, 'setAttribute');
    const spyRemoveAttribute3 = jest.spyOn(radio3, 'removeAttribute');

    const text = document.createElement('input');
    text.type = 'text';
    text.name = 'some-name';
    const spySetAttribute4 = jest.spyOn(text, 'setAttribute');
    const spyRemoveAttribute4 = jest.spyOn(text, 'removeAttribute');

    document.body.appendChild(radio1);
    document.body.appendChild(radio2);
    document.body.appendChild(radio3);
    document.body.appendChild(text);

    changeHandler({ target: { name: 'some-name' } } as unknown as Event);

    expect(spySetAttribute1).toBeCalledWith('hidden', '');
    expect(spyRemoveAttribute1).toBeCalledWith('hidden');
    expect(spySetAttribute2).toBeCalledWith('hidden', '');
    expect(spyRemoveAttribute2).toBeCalledWith('hidden');
    expect(spySetAttribute3).not.toBeCalled();
    expect(spyRemoveAttribute3).not.toBeCalled();
    expect(spySetAttribute4).not.toBeCalled();
    expect(spyRemoveAttribute4).not.toBeCalled();
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
