import React from 'react';
import { render } from '@testing-library/react';
import { PLinkSocial } from '@porsche-design-system/components-react';

describe('PLinkSocial', () => {
  it('should find PLinkSocial href', () => {
    const { getByText } = render(<PLinkSocial href={'#test'}>TestLink</PLinkSocial>);
    expect(getByText('TestLink').closest('a')).toHaveAttribute('href', '#test');
  });

  it('should render TagName of component', () => {
    const { container } = render(<PLinkSocial />);
    expect(container.getElementsByTagName('p-link-social')).toBeTruthy();
  });
});
