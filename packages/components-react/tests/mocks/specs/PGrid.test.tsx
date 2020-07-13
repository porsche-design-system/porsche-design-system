import React from 'react';
import { render } from '@testing-library/react';
import { PGrid } from '@porsche-design-system/components-react';

describe('PGrid', () => {
  it('should render PGrid children', () => {
    const { getByText } = render(<PGrid>GridChild</PGrid>);
    expect(getByText('GridChild')).toBeDefined();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PGrid />);
    expect(container.getElementsByTagName('p-grid')).toBeTruthy();
  });
});
