import * as throwIfInvalidLinkTileProductUsageUtils from '../../utils/validation/throwIfInvalidLinkTileProductUsage';
import { LinkTileProduct } from './link-tile-product';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkTileProductUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkTileProductUsageUtils, 'throwIfInvalidLinkTileProductUsage');
    const component = new LinkTileProduct();
    component.host = document.createElement('p-link-tile-product');
    component.href = '/';
    component.host.attachShadow({ mode: 'open' });
    try {
      component.componentWillLoad();
    } catch {}

    expect(spy).toHaveBeenCalledWith(component.host, component.href);
  });
});
