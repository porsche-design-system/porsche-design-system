import { MultiSelect } from './multi-select';
import * as multiSelectUtils from './multi-select-utils';

const initComponent = (): MultiSelect => {
  const component = new MultiSelect();
  component.host = document.createElement('p-multi-select');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('connectedCallback', () => {
  it('should call syncNativeSelect() if is within form', () => {
    // TODO: Wrap in form
    const component = initComponent();
    const spy = jest.spyOn(multiSelectUtils, 'syncNativeSelect');
    component.connectedCallback();
    expect(spy).toBeCalledWith(false, true);
  });
});
