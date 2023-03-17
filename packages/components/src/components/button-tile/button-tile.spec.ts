import { ButtonTile } from './button-tile';
import * as throwIfAlignTopWithoutCompactUtils from '../../utils/link-button-tile/link-button-tile-utils';

describe('componentWillLoad', () => {
  it('should call throwIfAlignTopAndNotCompact() with correct parameters', () => {
    const spy = jest.spyOn(throwIfAlignTopWithoutCompactUtils, 'throwIfAlignTopAndNotCompact');

    const component = new ButtonTile();
    component.host = document.createElement('p-button-tile');

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.align, component.compact);
  });
});
