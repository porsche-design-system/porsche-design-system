/* Auto Generated File */
import { componentsReady, PText } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const TextSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-text').forEach((text) => {
        text.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should show text skeleton in different sizes">
        <PText size="x-small">The quick brown fox jumps over the lazy dog</PText>
        <PText>The quick brown fox jumps over the lazy dog</PText>
        <PText size="medium">The quick brown fox jumps over the lazy dog</PText>
        <PText size="large">The quick brown fox jumps over the lazy dog</PText>
        <PText size="x-large">The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground dark" title="should show text skeleton in different sizes on dark theme">
        <PText theme="dark" size="x-small">The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark">The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark" size="medium">The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark" size="large">The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark" size="x-large">The quick brown fox jumps over the lazy dog</PText>
      </div>
    </>
  );
};
