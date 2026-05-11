import { vi } from 'vitest';
import * as throwIfInvalidLinkUsageUtils from '../../utils/validation/throwIfInvalidLinkUsage';
import { LinkSocial } from './link-social';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = vi.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkSocial();
    component.host = document.createElement('p-link-social');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith(component.host, component.href);
  });
});
