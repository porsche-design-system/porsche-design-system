import styled from 'styled-components';
import {
  getFocusStyle,
  getHoverStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightBackgroundBase,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const sharedWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
} as const;

const WrapperLight = styled.div({
  ...sharedWrapperStyle,
  background: themeLightBackgroundBase,
  color: themeLightPrimary,
});

const WrapperDark = styled.div({
  ...sharedWrapperStyle,
  background: themeDarkBackgroundBase,
  color: themeDarkPrimary,
});

// Typography
const Heading = styled.h3({
  ...headingMediumStyle,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

const Paragraph = styled.p({
  ...textSmallStyle,
  margin: 0,
  maxWidth: '15rem',
});

// Anchor
const NativeAnchor = styled.a({
  ...textSmallStyle,
  ...getHoverStyle(),
  ...getFocusStyle({ offset: 'none' }),
  color: 'inherit',
});

export const StylesHoverExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <Heading>Hover Light</Heading>
        <NativeAnchor href="#">Some Anchor</NativeAnchor>
        <Paragraph>
          Lorem Ipsum <NativeAnchor href="#">is simply dummy text of the printing</NativeAnchor> and typesetting
          industry.
        </Paragraph>
      </WrapperLight>
      <WrapperDark>
        <Heading>Hover Dark</Heading>
        <NativeAnchor href="#">Some Anchor</NativeAnchor>
        <Paragraph>
          Lorem Ipsum <NativeAnchor href="#">is simply dummy text of the printing</NativeAnchor> and typesetting
          industry.
        </Paragraph>
      </WrapperDark>
    </>
  );
};
