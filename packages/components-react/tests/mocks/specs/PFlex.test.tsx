import React from 'react';
import { render } from '@testing-library/react';
import { PFlex } from '../../../projects/components-wrapper/src/lib/components';

describe('PFlex', () => {
  it('should render PFlex children', () => {
    const { getByText } = render(<PFlex>FlexChild</PFlex>);
    expect(getByText('FlexChild')).toBeDefined();
  });
});
