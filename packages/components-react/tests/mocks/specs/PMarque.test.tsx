import * as React from 'react';
import { render } from '@testing-library/react';
import { PMarque } from '../../../projects/components-wrapper/src';

describe('PMarque', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PMarque/>);
    expect(container.getElementsByTagName('p-marque')).toBeTruthy();
  });
});
