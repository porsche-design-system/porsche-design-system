import { LinkTile } from './link-tile';
import * as throwIfAlignTopWithoutCompactUtils from '../../utils/link-button-tile/link-button-tile-utils';

describe('componentWillLoad', () => {
  it('should call throwIfAlignTopAndNotCompact() with correct parameters', () => {
    const spy = jest.spyOn(throwIfAlignTopWithoutCompactUtils, 'throwIfAlignTopAndNotCompact');

    const component = new LinkTile();
    component.host = document.createElement('p-link-tile');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith(component.host, component.align, component.compact);
  });
});
