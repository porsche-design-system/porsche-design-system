import React from 'react';
import { render } from '@testing-library/react';
import { PFlexItem, PGrid } from '../../../projects/components-wrapper/src/lib/components';

describe('PGrid', () => {
  it('should render PGrid children', () => {
    const { getByText } = render(<PGrid>GridChild</PGrid>);
    expect(getByText('GridChild')).toBeDefined();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PGrid/>);
    expect(container.getElementsByTagName('p-grid')).toBeTruthy();
  });
});
