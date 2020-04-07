import React from 'react';
import { render } from '@testing-library/react';
import { PLink, PLinkPure } from '../../../projects/components-wrapper/src/lib/components';

describe('PLink', () => {
  it('should find PLink href', () => {
    const {getByText} = render(
      <PLink href={"#test"}>TestLink</PLink>
    );
    expect(getByText('TestLink').closest('a')).toHaveAttribute('href', '#test');
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PLink/>);
    expect(container.getElementsByTagName('p-link')).toBeTruthy();
  });
});
