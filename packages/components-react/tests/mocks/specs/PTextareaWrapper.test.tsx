import React from 'react';
import { render } from '@testing-library/react';
import { PTextareaWrapper } from '../../../projects/components-wrapper/src/lib/components';

describe('PTextareaWrapper', () => {
  it('should render PTextareaWrapper text input', () => {
    const {container} = render(
      <PTextareaWrapper>
        <textarea name={"Wrapped-Textarea"} defaultValue={"Test Text"}></textarea>
      </PTextareaWrapper>
    );
    expect(container.getElementsByTagName('textarea').namedItem("Wrapped-Textarea")).toHaveTextContent('Test Text');
  });
});
