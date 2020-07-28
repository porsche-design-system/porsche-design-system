import React from 'react';
import { render } from '@testing-library/react';
import { PGridItem } from '@porsche-design-system/components-react';

describe('PGridItem', () => {
  it('should render PGridItem children', () => {
    const { getByText } = render(<PGridItem>Headline</PGridItem>);
    expect(getByText('Headline')).toBeDefined();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PGridItem />);
    expect(container.getElementsByTagName('p-grid-item')).toBeTruthy();
  });
});
