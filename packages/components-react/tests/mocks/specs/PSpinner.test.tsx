import * as React from 'react';
import { render } from '@testing-library/react';
import { PSpinner } from '../../../projects/components-wrapper/src';

describe('PSpinner', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PSpinner/>);
    expect(container.getElementsByTagName('p-spinner')).toBeTruthy();
  });
});
