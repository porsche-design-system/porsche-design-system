import * as React from 'react';
import { render } from '@testing-library/react';
import { PContentWrapper } from '../../../projects/components-wrapper/src';

describe('PContentWrapper', () => {
  it('should render PContentWrapper children', () => {
    const { getByText } = render(<PContentWrapper>ContentWrapperChild</PContentWrapper>);
    expect(getByText('ContentWrapperChild')).toBeDefined();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PContentWrapper/>);
    expect(container.getElementsByTagName('p-content-wrapper')).toBeTruthy();
  });
});
