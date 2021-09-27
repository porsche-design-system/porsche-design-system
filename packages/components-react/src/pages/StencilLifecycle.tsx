import { PButton, PLinkPure } from '@porsche-design-system/components-react';

import { useState } from 'react';

export const StencilLifecyclesPage = (): JSX.Element => {
  const [key, setKey] = useState(0);

  return (
    <>
      <PButton
        onClick={() => {
          setKey(Math.random());
        }}
      >
        Change key on click
      </PButton>

      <PLinkPure key={key} size="small">
        Some Link
      </PLinkPure>
    </>
  );
};
