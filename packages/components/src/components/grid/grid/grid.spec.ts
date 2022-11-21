import { Grid } from './grid';
import * as gridUtils from './grid-utils';

describe('render', () => {
  it('should call syncGridItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(gridUtils, 'syncGridItemsProps');

    const component = new Grid();
    component.host = document.createElement('p-grid');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, component.gutter);
  });
});
