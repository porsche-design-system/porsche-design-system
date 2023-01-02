import { LinkTile } from './link-tile';
import * as throwIfAlignTopWithoutCompactUtils from './link-tile-utils';

describe('connectedCallback', () => {
  it('should call throwIfAlignTopAndNotCompact() with correct parameters', () => {
    const spy = jest.spyOn(throwIfAlignTopWithoutCompactUtils, 'throwIfAlignTopAndNotCompact');

    const component = new LinkTile();
    component.host = document.createElement('p-link-tile');
    component.href = '#';

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, component.align, component.compact);
  });
});
