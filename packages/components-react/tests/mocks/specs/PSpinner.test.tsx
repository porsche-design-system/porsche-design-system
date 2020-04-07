import React from 'react';
import { render } from '@testing-library/react';
import { PSpinner } from '../../../projects/components-wrapper/src/lib/components';

describe('PFlexItem', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PSpinner/>);
    expect(container.getElementsByTagName('p-spinner')).toBeTruthy();
  });
});
