import * as React from 'react';
import { render } from '@testing-library/react';
import { PLink } from '../../../projects/components-wrapper/src';

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
