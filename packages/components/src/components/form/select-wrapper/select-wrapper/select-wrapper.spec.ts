import { SelectWrapper } from './select-wrapper';
import * as selectWrapperUtils from './select-wrapper-utils';
import * as propertyObserverUtils from '../../../../utils/property-observer';

const initComponent = (): SelectWrapper => {
  const component = new SelectWrapper();
  component.host = document.createElement('p-select-wrapper');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentWillLoad', () => {
  it('should call isCustomDropdown() with correct parameters', () => {
    const component = initComponent();
    component.host.append(document.createElement('select'));
    component.native = true;

    const spy = jest.spyOn(selectWrapperUtils, 'isCustomDropdown');
    component.componentWillLoad();

    expect(spy).toBeCalledWith(false, true);
  });
});

describe('observeOptions()', () => {
  it('should call observeProperties() for each option', () => {
    const component = initComponent();
    component['select'] = document.createElement('select');
    const options: HTMLOptionElement[] = [];

    Array.from(Array(3)).forEach((_, idx) => {
      const el = document.createElement('option');
      el.value = `${idx}`;
      component['select'].appendChild(el);
      options.push(el);
    });

    const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');
    component['observeOptions']();

    expect(spy).toBeCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith(options[2], ['selected', 'disabled'], expect.anything());
  });
});
