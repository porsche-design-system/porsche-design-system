import { PButton } from '@porsche-design-system/components-react/ssr';
import { headers } from 'next/headers';
import { Suspense } from 'react';

const StreamedButton = async () => {
  // forces dynamic rendering, so the button is streamed after the static shell has loaded the components
  await headers();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <PButton id="streamed-button" variant="secondary">
      Streamed button
    </PButton>
  );
};

export default function StreamingPropsPage() {
  return (
    <>
      <PButton>Static button</PButton>
      <Suspense fallback="Loading...">
        <StreamedButton />
      </Suspense>
    </>
  );
}
