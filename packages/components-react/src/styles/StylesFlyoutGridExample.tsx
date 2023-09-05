import { PFlyout } from '@porsche-design-system/components-react';
import styled from 'styled-components';
import { spacingFluidLarge, spacingStaticMedium } from '@porsche-design-system/components-react/styles';
import { GridLayout } from '../components';

// Wrapper
const Wrapper = styled.div({
  opacity: 0,
  maxWidth: '1180px',
  boxSizing: 'border-box',
  paddingTop: spacingFluidLarge,
  paddingRight: spacingStaticMedium,
  paddingBottom: spacingFluidLarge,
  paddingLeft: spacingStaticMedium,
});

export const StylesFlyoutGridExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <GridLayout gridVisualizer={false} />
      </Wrapper>
      <PFlyout open={true}>
        <GridLayout gridVisualizer={false} />
      </PFlyout>
    </>
  );
};
