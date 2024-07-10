import { useState } from 'react';
import { PTextareaWrapper, PTextFieldWrapper } from '@porsche-design-system/components-react';

export const LifecycleOverlappingPage = (): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const props = {
    label: 'Some label',
    showCounter: false,
  };

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>Set Active</button>
      <PTextFieldWrapper {...props}>
        <input type="text" />
      </PTextFieldWrapper>
      {isActive && (
        <PTextFieldWrapper {...props}>
          <input type="text" />
        </PTextFieldWrapper>
      )}
      <PTextareaWrapper {...props}>
        <textarea />
      </PTextareaWrapper>
      {isActive && (
        <PTextareaWrapper {...props}>
          <textarea />
        </PTextareaWrapper>
      )}
    </div>
  );
};
