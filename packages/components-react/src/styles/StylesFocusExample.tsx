import styled from 'styled-components';
import {
  getFocusStyle,
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
const getWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
} as const;

const WrapperLight = styled.div({
  ...getWrapperStyle,
  background: themeLightBackgroundBase,
  color: themeLightPrimary,
});

const WrapperDark = styled.div({
  ...getWrapperStyle,
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

// Button
const NativeButton = styled.button({
  ...textSmallStyle,
  ...getFocusStyle(),
});

// Anchor
const NativeAnchorLight = styled.a({
  ...textSmallStyle,
  ...getFocusStyle(),
  color: themeLightPrimary,
});

const NativeAnchorDark = styled.a({
  ...textSmallStyle,
  ...getFocusStyle(),
  color: themeDarkPrimary,
});

export const StylesFocusExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <Heading>Focus Light (only visible by keyboard navigation)</Heading>
        <NativeButton>Some Button</NativeButton>
        <NativeAnchorLight href="#">Some Anchor</NativeAnchorLight>
        <p style={{ maxWidth: '15rem' }}>
          Lorem Ipsum
          <NativeAnchorLight href="#">is simply dummy text of the printing</NativeAnchorLight>
          typesetting industry.
        </p>
      </WrapperLight>
      <WrapperDark>
        <Heading>Focus Dark (only visible by keyboard navigation)</Heading>
        <NativeButton>Some Button</NativeButton>
        <NativeAnchorDark href="#">Some Anchor</NativeAnchorDark>
        <p style={{ maxWidth: '15rem' }}>
          Lorem Ipsum
          <NativeAnchorDark href="#">is simply dummy text of the printing</NativeAnchorDark>
          typesetting industry.
        </p>
      </WrapperDark>
    </>
  );
};
