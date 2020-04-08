import * as React from 'react';
import { render } from '@testing-library/react';
import { PDivider } from '../../../projects/components-wrapper/src';

describe('PDivider', () => {
  it('should render TagName of component', ()=> {
    const {container} = render(<PDivider/>);
    expect(container.getElementsByTagName('p-divider')).toBeTruthy();
  });
});
