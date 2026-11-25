import { PButton, PText } from '@porsche-design-system/components-react/ssr';
import { headers } from 'next/headers';
import { Suspense } from 'react';

const StreamedComponents = async () => {
  // forces dynamic rendering, so the components are streamed after the static shell has loaded the components
  await headers();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      {/* element children: a `<template>` left over in the light DOM would break React's hydration here (#3956) */}
      <PButton id="streamed-button" variant="secondary">
        <span id="streamed-button-label">Streamed button</span>
      </PButton>
      <PText id="streamed-text">
        <strong>Streamed</strong> <em>text</em>
      </PText>
    </>
  );
};

export default function StreamingChildrenPage() {
  return (
    <>
      <PButton>Static button</PButton>
      <Suspense fallback="Loading...">
        <StreamedComponents />
      </Suspense>
    </>
  );
}
