import { PLinkPure } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const StencilLifecyclesPage = (): JSX.Element => {
  const [key, setKey] = useState({
    linkPure: 0,
    headline: false,
  });

  console.log(key.linkPure);
  return (
    <>
      <button
        onClick={() => {
          setKey(({ linkPure }) => ({ linkPure: linkPure + 1, headline: true }));
        }}
      >
        Render Link and Change key on click
      </button>

      {key.headline && (
        <PLinkPure key={key.linkPure} size="large" href="https://porsche.com">
          Some Link with non default props
        </PLinkPure>
      )}
    </>
  );
};
