import React from 'react';
import { render } from '@testing-library/react';
import { PFieldsetWrapper } from '@porsche-design-system/components-react';

describe('PFieldsetWrapper', () => {
  it('should render PFieldsetWrapper children', () => {
    const { getByText } = render(<PFieldsetWrapper>Text</PFieldsetWrapper>);
    expect(getByText('Text')).toBeDefined();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PFieldsetWrapper />);
    expect(container.getElementsByTagName('p-fieldset-wrapper')).toBeTruthy();
  });
});
