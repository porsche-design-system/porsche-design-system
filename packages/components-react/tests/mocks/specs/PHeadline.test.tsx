import * as React from 'react';
import { render } from '@testing-library/react';
import { PHeadline } from '../../../projects/components-wrapper/src';

describe('PHeadline', () => {
  it('should render PHeadline children', () => {
    const { getByText } = render(<PHeadline>Headline</PHeadline>);
    expect(getByText('Headline')).toBeDefined();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PHeadline/>);
    expect(container.getElementsByTagName('p-headline')).toBeTruthy();
  });
});
