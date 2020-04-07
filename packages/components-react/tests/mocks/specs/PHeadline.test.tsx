import React from 'react';
import { render } from '@testing-library/react';
import { PHeadline } from '../../../projects/components-wrapper/src/lib/components';

describe('PHeadline', () => {
  it('should render PHeadline children', () => {
    const { getByText } = render(<PHeadline>Headline</PHeadline>);
    expect(getByText('Headline')).toBeDefined();
  });
});
