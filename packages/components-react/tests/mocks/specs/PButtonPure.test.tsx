import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PButtonPure } from '../../../projects/components-wrapper/src/lib/components';

describe('PButtonPure', () => {
  it('should fire events on button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PButtonPure onClick={onClick}>Button</PButtonPure>);

    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
