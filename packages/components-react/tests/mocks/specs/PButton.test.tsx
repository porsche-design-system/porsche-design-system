import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PButton } from '../../../projects/components-wrapper/src';

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
