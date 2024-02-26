import { type FunctionalComponent, h } from '@stencil/core';

type LoadingMessageProps = {
  loading: boolean;
  initialLoading: boolean;
};

export const loadingId = 'loading';

export const LoadingMessage: FunctionalComponent<LoadingMessageProps> = ({ loading, initialLoading }) => {
  return (
    <span id={loadingId} class="loading" role="status">
      {loading ? 'Loading' : !initialLoading ? '' : 'Loading finished'}
    </span>
  );
};
