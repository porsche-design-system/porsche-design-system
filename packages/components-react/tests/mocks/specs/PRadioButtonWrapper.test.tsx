import * as React from 'react';
import { render } from '@testing-library/react';
import { PRadioButtonWrapper } from '../../../projects/components-wrapper/src';

describe('PRadioButtonWrapper', () => {
  it('should render PRadioButtonWrapper input name', () => {
    const {container} = render(
      <PRadioButtonWrapper>
        <input type={"radio"}/>
      </PRadioButtonWrapper>
    );
    expect(container.getElementsByTagName('input')).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PRadioButtonWrapper/>);
    expect(container.getElementsByTagName('p-radiobutton-wrapper')).toBeTruthy();
  });
});
