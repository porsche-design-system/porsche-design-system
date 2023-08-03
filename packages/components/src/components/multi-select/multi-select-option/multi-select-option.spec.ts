import { MultiSelectOption } from './multi-select-option';

const initComponent = (): MultiSelectOption => {
  const component = new MultiSelectOption();
  component.host = document.createElement('p-multi-select-option');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentDidUpdate()', () => {
  it('should emit internal update event', () => {
    const component = initComponent();
    const dispatchEventSpy = jest.spyOn(component.host, 'dispatchEvent');
    component.componentDidUpdate();
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      new CustomEvent('internalOptionUpdate', {
        bubbles: true,
      })
    );
  });
});
