import { PInputText, PTextarea } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const LifecycleOverlappingPage = (): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const props = {
    label: 'Some label',
    name: 'some-name',
  };

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>Set Active</button>
      <PInputText {...props} />
      {isActive && <PInputText {...props} />}
      <PTextarea {...props} />
      {isActive && <PTextarea {...props} />}
    </>
  );
};
