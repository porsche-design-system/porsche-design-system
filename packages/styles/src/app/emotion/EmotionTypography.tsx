import styled from '@emotion/styled';
import {
  displayLargeStyle,
  displayMediumStyle,
  displaySmallStyle,
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
} from '@porsche-design-system/emotion';

const EmotionTypographyWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacingFluidMedium,
  padding: spacingFluidMedium,
  color: theme.primary,
}));

const DisplayLarge = styled.h1({
  ...displayLargeStyle,
  margin: 0,
});

const DisplayMedium = styled.h2({
  ...displayMediumStyle,
  margin: 0,
});

const DisplaySmall = styled.h2({
  ...displaySmallStyle,
  margin: 0,
});

const HeadingXXLarge = styled.h2({
  ...headingXXLargeStyle,
  margin: 0,
});

const HeadingXLarge = styled.h3({
  ...headingXLargeStyle,
  margin: 0,
});

const HeadingLarge = styled.h4({
  ...headingLargeStyle,
  margin: 0,
});

const HeadingMedium = styled.h5({
  ...headingMediumStyle,
  margin: 0,
});

const HeadingSmall = styled.h6({
  ...headingSmallStyle,
  margin: 0,
});

const TextXLarge = styled.p({
  ...textXLargeStyle,
  margin: 0,
});

const TextLarge = styled.p({
  ...textLargeStyle,
  margin: 0,
});

const TextMedium = styled.p({
  ...textMediumStyle,
  margin: 0,
});

const TextSmallStyled = styled.p({
  ...textSmallStyle,
  margin: 0,
});

const TextXSmall = styled.p({
  ...textXSmallStyle,
  margin: 0,
});

const TextXXSmall = styled.p({
  ...textXXSmallStyle,
  margin: 0,
});

export const EmotionTypography = () => {
  return (
    <>
      <EmotionTypographyWrapper>
        <DisplayLarge>Display lg</DisplayLarge>
        <DisplayMedium>Display md</DisplayMedium>
        <DisplaySmall>Display sm</DisplaySmall>
      </EmotionTypographyWrapper>
      <EmotionTypographyWrapper>
        <HeadingXXLarge>Heading 2xl</HeadingXXLarge>
        <HeadingXLarge>Heading xl</HeadingXLarge>
        <HeadingLarge>Heading lg</HeadingLarge>
        <HeadingMedium>Heading md</HeadingMedium>
        <HeadingSmall>Heading sm</HeadingSmall>
      </EmotionTypographyWrapper>
      <EmotionTypographyWrapper>
        <TextXLarge>text xl</TextXLarge>
        <TextLarge>text lg</TextLarge>
        <TextMedium>text md</TextMedium>
        <TextSmallStyled>text sm</TextSmallStyled>
        <TextXSmall>text xs</TextXSmall>
        <TextXXSmall>text 2xs</TextXXSmall>
      </EmotionTypographyWrapper>
    </>
  );
};
