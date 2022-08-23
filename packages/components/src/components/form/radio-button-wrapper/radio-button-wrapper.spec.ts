import { RadioButtonWrapper } from './radio-button-wrapper';

describe('componentDidLoad', () => {
  it('should call addEventListeners()', () => {
    const component = new RadioButtonWrapper();
    // needs to be mocked for component lifecycle flow to work
    component['input'] = document.createElement('input');

    const spy = jest.spyOn(component, 'addEventListeners' as any).mockImplementationOnce(() => {});

    try {
      component.componentDidLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
