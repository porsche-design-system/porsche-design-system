/* Auto Generated File */
import { componentsReady, PHeadline } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const HeadlineSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-headline').forEach((headline) => {
        headline.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should show skeleton headlines with different style variants">
        <PHeadline variant="large-title">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-1">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-2">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-3">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-4">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-5">The quick brown fox jumps over the lazy dog</PHeadline>
      </div>

      <div className="playground dark" title="should show skeleton headlines with different style variants on dark background">
        <PHeadline theme="dark" variant="large-title">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline theme="dark" variant="headline-1">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline theme="dark" variant="headline-2">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline theme="dark" variant="headline-3">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline theme="dark" variant="headline-4">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline theme="dark" variant="headline-5">The quick brown fox jumps over the lazy dog</PHeadline>
      </div>
    </>
  );
};
