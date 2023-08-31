import { PFlyout } from '@porsche-design-system/components-react';
import { GridLayout } from '../components';

export const StylesFlyoutGridExample = (): JSX.Element => {
  return (
    <>
      <PFlyout open={true}>
        <GridLayout gridVisualizer={false} />
      </PFlyout>
    </>
  );
};
