'use client';

import { PButton } from '@porsche-design-system/components-react/ssr';
import { useState } from 'react';

// The variant changes after React has hydrated the page. A test holds the components back until then, to check that
// the props of the server are not applied over the new ones when the component finally starts.
export default function HydratedPropsPage() {
  const [variant, setVariant] = useState<'secondary' | 'primary'>('secondary');

  return (
    <>
      <button id="change-variant" type="button" onClick={() => setVariant('primary')}>
        Change variant
      </button>
      <PButton id="hydrated-button" variant={variant}>
        Button registered after hydration
      </PButton>
    </>
  );
}
