import React from 'react';
import { render } from '@testing-library/react';
import { PLinkPure } from '@porsche-design-system/components-react';

describe('PLinkPure', () => {
  it('should find PLinkPure href', () => {
    const { getByText } = render(<PLinkPure href={'#test'}>TestLink</PLinkPure>);
    expect(getByText('TestLink').closest('a')).toHaveAttribute('href', '#test');
  });

  it('should render TagName of component', () => {
    const { container } = render(<PLinkPure />);
    expect(container.getElementsByTagName('p-link-pure')).toBeTruthy();
  });
});
