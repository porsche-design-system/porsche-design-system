import React from 'react';
import { render } from '@testing-library/react';
import { PHeadline, PIcon } from '../../../projects/components-wrapper/src/lib/components';

describe('PHeadline', () => {
  it('should render Highway Icon children', () => {
    const { container } = render(<PIcon name={"highway"}></PIcon>);
    const icon = container.getElementsByTagName("p-icon");

    expect(icon.namedItem('highway')).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PIcon/>);
    expect(container.getElementsByTagName('p-icon')).toBeTruthy();
  });
});
