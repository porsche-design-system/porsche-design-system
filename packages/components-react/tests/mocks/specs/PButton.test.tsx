import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PButton, PLinkPure } from '../../../projects/components-wrapper/src/lib/components';

describe('PButton', () => {
  it('should fire events on button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PButton onClick={onClick}>Button</PButton>);

    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PButton/>);
    expect(container.getElementsByTagName('p-button')).toBeTruthy();
  });
});
