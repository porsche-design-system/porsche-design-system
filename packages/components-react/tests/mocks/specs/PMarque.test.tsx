import React from 'react';
import { render } from '@testing-library/react';
import { PMarque } from '@porsche-design-system/components-react';

describe('PMarque', () => {
  it('should render TagName of component', () => {
    const { container } = render(<PMarque />);
    expect(container.getElementsByTagName('p-marque')).toBeTruthy();
  });
});
