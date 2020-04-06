import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PButton } from '../../../projects/components-wrapper/src/lib/components';

describe('PButton', () => {
  it('should fire events on button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PButton onClick={onClick}>Button</PButton>);

    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
