import { vi } from 'vitest';
import * as throwIfParentIsNotOfKindUtils from '../../utils/validation/throwIfParentIsNotOfKind';
import { Optgroup } from './optgroup';
import * as optgroupUtils from './optgroup-utils';

const initComponent = (): Optgroup => {
  const component = new Optgroup();
  component.host = document.createElement('p-optgroup');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('connectedCallback', () => {
  it('should call throwIfParentIsNotOfKind() with correct arguments', () => {
    const component = initComponent();
    const throwIfParentIsNotOfKindSpy = vi.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
    component.connectedCallback();
    expect(throwIfParentIsNotOfKindSpy).toHaveBeenCalledWith(component.host, ['p-select', 'p-multi-select']);
  });
});

describe('componentWillLoad', () => {
  it('should call updateOptionsDisabled() with correct arguments', () => {
    const component = initComponent();
    const updateOptionsDisabledSpy = vi.spyOn(optgroupUtils, 'updateOptionsDisabled');
    component.componentWillLoad();
    expect(updateOptionsDisabledSpy).toHaveBeenCalledWith(component.host, component.disabled);
  });
});

describe('handleDisabledChange()', () => {
  it('should call updateOptionsDisabled() with correct arguments', () => {
    const component = initComponent();
    const updateOptionsDisabledSpy = vi.spyOn(optgroupUtils, 'updateOptionsDisabled');
    component.handleDisabledChange();
    expect(updateOptionsDisabledSpy).toHaveBeenCalledWith(component.host, component.disabled);
  });
});
