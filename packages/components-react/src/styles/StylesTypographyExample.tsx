import styled from '@emotion/styled';
import {
  displayLargeStyle,
  displayMediumStyle,
  displaySmallStyle,
  gridGap,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
  spacingFluidMedium,
  textLargeStyle,
  textMediumStyle,
  textSmallStyle,
  textXLargeStyle,
  textXSmallStyle,
  textXXSmallStyle,
  themeLightPrimary,
} from '@porsche-design-system/components-react/emotion';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
const typographyBaseStyle = {
  color: themeLightPrimary,
  margin: 0,
} as const;

const Heading = styled.h3({
  ...typographyBaseStyle,
  ...headingMediumStyle,
});

// Display
const DisplayLargeStyle = styled.h1({
  ...typographyBaseStyle,
  ...displayLargeStyle,
});

const DisplayMediumStyle = styled.h2({
  ...typographyBaseStyle,
  ...displayMediumStyle,
});

const DisplaySmallStyle = styled.h2({
  ...typographyBaseStyle,
  ...displaySmallStyle,
});

// Heading
const HeadingXXLargeStyle = styled.h2({
  ...typographyBaseStyle,
  ...headingXXLargeStyle,
});

const HeadingXLargeStyle = styled.h3({
  ...typographyBaseStyle,
  ...headingXLargeStyle,
});

const HeadingLargeStyle = styled.h4({
  ...typographyBaseStyle,
  ...headingLargeStyle,
});

const HeadingMediumStyle = styled.h5({
  ...typographyBaseStyle,
  ...headingMediumStyle,
});

const HeadingSmallStyle = styled.h6({
  ...typographyBaseStyle,
  ...headingSmallStyle,
});

// Text
const TextXLargeStyle = styled.p({
  ...typographyBaseStyle,
  ...textXLargeStyle,
});

const TextLargeStyle = styled.p({
  ...typographyBaseStyle,
  ...textLargeStyle,
});

const TextMediumStyle = styled.p({
  ...typographyBaseStyle,
  ...textMediumStyle,
});

const TextSmallStyle = styled.p({
  ...typographyBaseStyle,
  ...textSmallStyle,
});

const TextXSmallStyle = styled.p({
  ...typographyBaseStyle,
  ...textXSmallStyle,
});

const TextXXSmallStyle = styled.p({
  ...typographyBaseStyle,
  ...textXXSmallStyle,
});

export const StylesTypographyExample = (): JSX.Element => {
  const content = 'The quick brown fox jumps over the lazy dog';
  return (
    <>
      <Wrapper>
        <Heading>Display</Heading>
        <DisplayLargeStyle>{content}</DisplayLargeStyle>
        <DisplayMediumStyle>{content}</DisplayMediumStyle>
        <DisplaySmallStyle>{content}</DisplaySmallStyle>
      </Wrapper>
      <Wrapper>
        <Heading>Heading</Heading>
        <HeadingXXLargeStyle>{content}</HeadingXXLargeStyle>
        <HeadingXLargeStyle>{content}</HeadingXLargeStyle>
        <HeadingLargeStyle>{content}</HeadingLargeStyle>
        <HeadingMediumStyle>{content}</HeadingMediumStyle>
        <HeadingSmallStyle>{content}</HeadingSmallStyle>
      </Wrapper>
      <Wrapper>
        <Heading>Text</Heading>
        <TextXLargeStyle>{content}</TextXLargeStyle>
        <TextLargeStyle>{content}</TextLargeStyle>
        <TextMediumStyle>{content}</TextMediumStyle>
        <TextSmallStyle>{content}</TextSmallStyle>
        <TextXSmallStyle>{content}</TextXSmallStyle>
        <TextXXSmallStyle>{content}</TextXXSmallStyle>
      </Wrapper>
    </>
  );
};
