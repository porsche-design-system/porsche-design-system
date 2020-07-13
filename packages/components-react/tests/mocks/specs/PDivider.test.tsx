import React from 'react';
import { render } from '@testing-library/react';
import { PDivider } from '@porsche-design-system/components-react';

describe('PDivider', () => {
  it('should render TagName of component', () => {
    const { container } = render(<PDivider />);
    expect(container.getElementsByTagName('p-divider')).toBeTruthy();
  });
});
