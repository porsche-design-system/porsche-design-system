import * as React from 'react';
import { render } from '@testing-library/react';
import { PLinkSocial } from '../../../projects/components-wrapper/src';

describe('PLinkSocial', () => {
  it('should find PLinkSocial href', () => {
    const {getByText} = render(
      <PLinkSocial href={"#test"}>TestLink</PLinkSocial>
    );
    expect(getByText('TestLink').closest('a')).toHaveAttribute('href', '#test');
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PLinkSocial/>);
    expect(container.getElementsByTagName('p-link-social')).toBeTruthy();
  });
});
