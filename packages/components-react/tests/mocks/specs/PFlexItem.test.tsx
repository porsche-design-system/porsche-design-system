import React from 'react';
import { render } from '@testing-library/react';
import { PFlex, PHeadline } from '../../../projects/components-wrapper/src/lib/components';

describe('PFlexItem', () => {
  it('should render PFlexItem children', () => {
    const { getByText } = render(<PFlex><PHeadline>Headline</PHeadline></PFlex>);
    expect(getByText('Headline')).toBeDefined();
  });
});
