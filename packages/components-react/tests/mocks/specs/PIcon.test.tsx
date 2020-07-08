import * as React from 'react';
import { render } from '@testing-library/react';
import { PIcon } from '../../../projects/components-wrapper/src';

describe('PIcon', () => {
  it('should render Highway Icon children', () => {
    const { container } = render(<PIcon name={'highway'} />);
    const icon = container.getElementsByTagName('p-icon');

    expect(icon.namedItem('highway')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PIcon />);
    expect(container.getElementsByTagName('p-icon')).toBeTruthy();
  });

  it('should render i html tag', () => {
    const { container } = render(<PIcon />);
    expect(container.getElementsByTagName('i').length).toBe(1);
  });
});
