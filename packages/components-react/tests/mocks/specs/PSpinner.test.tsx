import React from 'react';
import { render } from '@testing-library/react';
import { PSpinner } from '@porsche-design-system/components-react';

describe('PSpinner', () => {
  it('should render TagName of component', () => {
    const { container } = render(<PSpinner />);
    expect(container.getElementsByTagName('p-spinner')).toBeTruthy();
  });
});
