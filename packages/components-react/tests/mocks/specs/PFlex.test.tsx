import * as React from 'react';
import { render } from '@testing-library/react';
import { PFlex } from '../../../projects/components-wrapper/src';

describe('PFlex', () => {
  it('should render PFlex children', () => {
    const { getByText } = render(<PFlex>FlexChild</PFlex>);
    expect(getByText('FlexChild')).toBeDefined();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PFlex/>);
    expect(container.getElementsByTagName('p-flex')).toBeTruthy();
  });
});
