import { type FunctionalComponent, h } from '@stencil/core';

type LoadingMessageProps = {
  loading: boolean;
  initialLoading: boolean;
};

export const statusId = 'status';

export const LoadingMessage: FunctionalComponent<LoadingMessageProps> = ({ loading, initialLoading }) => {
  return (
    <span id={statusId} class="status" role="status">
      {loading ? 'loading' : !initialLoading ? '' : 'Loading finished'}
    </span>
  );
};
