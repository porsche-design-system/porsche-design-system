import { LinkTile } from './link-tile';
import * as throwIfInvalidLinkPureUsageUtils from '../../utils/validation/throwIfInvalidLinkPureUsage';
import * as throwIfAlignTopWithoutCompactUtils from './link-tile-utils';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkPureUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkPureUsageUtils, 'throwIfInvalidLinkPureUsage');

    const component = new LinkTile();
    component.host = document.createElement('p-link-tile');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.href);
  });

  it('should call throwIfAlignTopWithoutCompact() with correct parameters', () => {
    const spy = jest.spyOn(throwIfAlignTopWithoutCompactUtils, 'throwIfAlignTopWithoutCompact');

    const component = new LinkTile();
    component.host = document.createElement('p-link-tile');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.align, component.compact);
  });
});
