import { PFlyout, PHeading, PButton, PText } from '@porsche-design-system/components-react';
import styled from 'styled-components';
import { spacingFluidLarge, gridGap } from '@porsche-design-system/components-react/styles';
import { GridLayout } from '../components';

// Wrapper
const Wrapper = styled.div({
  opacity: 0,
  overflowX: 'hidden',
  maxWidth: '1180px',
  boxSizing: 'border-box',
  paddingTop: '100px',
  paddingRight: spacingFluidLarge,
  paddingBottom: '150px',
  paddingLeft: spacingFluidLarge,
  '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
  '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
});

export const StylesFlyoutGridExample = (): JSX.Element => {
  return (
    <>
      {/* Wrapper and nested GridLayout is needed to calculate the whole height of rendered frid example to support full height screenshot of flyout with grid */}
      <Wrapper>
        <GridLayout visualizeGrid={false} />
      </Wrapper>
      <PFlyout open={true}>
        <div slot="header">
          <PHeading tag="h5" size="large">
            Sticky Heading
          </PHeading>
          <PText size="small">Sticky header text</PText>
        </div>
        <GridLayout visualizeGrid={false} />
        <div slot="footer">
          <PButton type="button">Footer Button</PButton>
        </div>
        <div slot="sub-footer">Some Sub Footer Content</div>
      </PFlyout>
    </>
  );
};
