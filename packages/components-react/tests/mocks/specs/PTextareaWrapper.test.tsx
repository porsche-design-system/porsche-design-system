import React from 'react';
import { render } from '@testing-library/react';
import { PText, PTextareaWrapper } from '../../../projects/components-wrapper/src/lib/components';

describe('PTextareaWrapper', () => {
  it('should render PTextareaWrapper text input', () => {
    const {container} = render(
      <PTextareaWrapper>
        <textarea name={"Wrapped-Textarea"}/>
      </PTextareaWrapper>
    );
    expect(container.getElementsByTagName('textarea').namedItem("Wrapped-Textarea")).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PTextareaWrapper/>);
    expect(container.getElementsByTagName('p-textarea-wrapper')).toBeTruthy();
  });
});
