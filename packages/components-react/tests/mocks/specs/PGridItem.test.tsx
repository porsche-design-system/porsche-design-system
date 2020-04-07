import React from 'react';
import { render } from '@testing-library/react';
import { PGrid, PHeadline } from '../../../projects/components-wrapper/src/lib/components';

describe('PGridItem', () => {
  it('should render PGridItem children', () => {
    const { getByText } = render(<PGrid><PHeadline>Headline</PHeadline></PGrid>);
    expect(getByText('Headline')).toBeDefined();
  });
});
