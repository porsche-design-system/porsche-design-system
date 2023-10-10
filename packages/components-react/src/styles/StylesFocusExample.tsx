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
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
});

const WrapperLight = styled(Wrapper)({
  background: themeLightBackgroundBase,
  color: themeLightPrimary,
});

const WrapperDark = styled(Wrapper)({
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

// Button
const NativeButton = styled.button({
  ...textSmallStyle,
  ...getFocusStyle(),
});

// Anchor
const NativeAnchor = styled.a({
  ...textSmallStyle,
  ...getFocusStyle(),
  color: 'inherit',
});

export const StylesFocusExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <Heading>Focus Light (only visible by keyboard navigation)</Heading>
        <NativeButton>Some Button</NativeButton>
        <NativeAnchor href="#">Some Anchor</NativeAnchor>
        <Paragraph>
          Lorem Ipsum <NativeAnchor href="#">is simply dummy text of the printing</NativeAnchor> and typesetting
          industry.
        </Paragraph>
      </WrapperLight>
      <WrapperDark>
        <Heading>Focus Dark (only visible by keyboard navigation)</Heading>
        <NativeButton>Some Button</NativeButton>
        <NativeAnchor href="#">Some Anchor</NativeAnchor>
        <Paragraph>
          Lorem Ipsum <NativeAnchor href="#">is simply dummy text of the printing</NativeAnchor> and typesetting
          industry.
        </Paragraph>
      </WrapperDark>
    </>
  );
};
