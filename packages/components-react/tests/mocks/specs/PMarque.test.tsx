import React from 'react';
import { render } from '@testing-library/react';
import { PMarque } from '../../../projects/components-wrapper/src/lib/components';

describe('PFlexItem', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PMarque/>);
    expect(container.getElementsByTagName('p-marque')).toBeTruthy();
  });
});
