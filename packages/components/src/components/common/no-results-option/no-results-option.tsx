import { type FunctionalComponent, h } from '@stencil/core';

export const NoResultsOption: FunctionalComponent = () => {
  return (
    <div class="no-results" aria-live="polite" role="option">
      <span aria-hidden="true">–</span>
      <span class="sr-only">No results found</span>
    </div>
  );
};
