import * as React from 'react';
import { render } from '@testing-library/react';
import { PFlexItem } from '../../../projects/components-wrapper/src';

describe('PFlexItem', () => {
  it('should render PFlexItem children', () => {
    const { getByText } = render(<PFlexItem>Headline</PFlexItem>);
    expect(getByText('Headline')).toBeDefined();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PFlexItem/>);
    expect(container.getElementsByTagName('p-flex-item')).toBeTruthy();
  });
});
