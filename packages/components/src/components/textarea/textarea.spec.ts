import { Textarea } from './textarea';
import * as formUtils from '../../utils/form/form-utils';

jest.mock('../../utils/dom');

const initComponent = (): Textarea => {
  const component = new Textarea();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentWillLoad', () => {
  it('should call hasCounter() with correct parameter and set hasCounter', () => {
    const textarea = document.createElement('textarea');

    const spy = jest.spyOn(formUtils, 'hasCounter');
    const component = initComponent();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });
});
