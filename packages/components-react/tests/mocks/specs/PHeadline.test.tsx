import React from 'react';
import { render } from '@testing-library/react';
import { PGridItem, PHeadline } from '../../../projects/components-wrapper/src/lib/components';

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
