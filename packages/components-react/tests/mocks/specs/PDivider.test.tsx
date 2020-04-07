import React from 'react';
import { render } from '@testing-library/react';
import { PDivider } from '../../../projects/components-wrapper/src/lib/components';

describe('PFlexItem', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PDivider/>);
    expect(container.getElementsByTagName('p-divider')).toBeTruthy();
  });
});
