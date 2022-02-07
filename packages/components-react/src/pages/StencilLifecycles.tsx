import { PLinkPure } from '@porsche-design-system/components-react';
import { useState } from 'react';

/* Page used to render/repaint a React Wrapper Component of the PDS on button click,
 to track the initiated stencil lifecycles */

export const StencilLifecyclesPage = (): JSX.Element => {
  const [key, setKey] = useState(0);

  return (
    <>
      <button onClick={() => setKey((prev) => prev + 1)}>Render Link and Change key on click</button>

      {key > 0 && (
        <PLinkPure key={key} size="large" href="https://porsche.com">
          Some Link with non default props
        </PLinkPure>
      )}
    </>
  );
};
