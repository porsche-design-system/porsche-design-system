import { LinkTile } from './link-tile';
import * as throwIfPropIsUndefinedUtils from '../../utils/validation/throwIfPropIsUndefined';
import * as throwIfAlignTopWithoutCompactUtils from './link-tile-utils';

describe('componentWillLoad', () => {
  it('should call throwIfPropIsUndefined() with correct parameters', () => {
    const spy = jest.spyOn(throwIfPropIsUndefinedUtils, 'throwIfPropIsUndefined');

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
