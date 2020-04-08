import * as React from 'react';
import { render } from '@testing-library/react';
import { PTextareaWrapper } from '../../../projects/components-wrapper/src';

describe('PTextareaWrapper', () => {
  it('should render PTextareaWrapper text input', () => {
    const {container} = render(
      <PTextareaWrapper>
        <textarea/>
      </PTextareaWrapper>
    );
    expect(container.getElementsByTagName('textarea')).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PTextareaWrapper/>);
    expect(container.getElementsByTagName('p-textarea-wrapper')).toBeTruthy();
  });
});
