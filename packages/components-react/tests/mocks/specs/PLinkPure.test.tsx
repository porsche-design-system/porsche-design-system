import React from 'react';
import { render } from '@testing-library/react';
import { PLinkPure } from '../../../projects/components-wrapper/src/lib/components';

describe('PLinkPure', () => {
  it('should find PLinkPure href', () => {
    const {getByText} = render(
      <PLinkPure href={"#test"}>TestLink</PLinkPure>
    );
    expect(getByText('TestLink').closest('a')).toHaveAttribute('href', '#test');
  });
});
