import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PButtonPure } from '@porsche-design-system/components-react';

describe('PButtonPure', () => {
  it('should fire events on button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PButtonPure onClick={onClick}>Button</PButtonPure>);

    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render TagName of component', () => {
    const { container } = render(<PButtonPure />);
    expect(container.getElementsByTagName('p-button-pure')).toBeTruthy();
  });
});
