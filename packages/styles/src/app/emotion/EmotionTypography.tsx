import styled from '@emotion/styled';
import {
  proseDisplayLgStyle,
  proseDisplayMdStyle,
  proseDisplaySmStyle,
  proseHeading2XlStyle,
  proseHeadingLgStyle,
  proseHeadingMdStyle,
  proseHeadingSmStyle,
  proseHeadingXlStyle,
  proseText2XsStyle,
  proseTextLgStyle,
  proseTextMdStyle,
  proseTextSmStyle,
  proseTextXlStyle,
  proseTextXsStyle,
  spacingFluidMd,
} from '@porsche-design-system/emotion';

const EmotionTypographyWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacingFluidMd,
  padding: spacingFluidMd,
  color: theme.primary,
}));

const DisplayLarge = styled.h1({
  ...proseDisplayLgStyle,
  margin: 0,
});

const DisplayMedium = styled.h2({
  ...proseDisplayMdStyle,
  margin: 0,
});

const DisplaySmall = styled.h2({
  ...proseDisplaySmStyle,
  margin: 0,
});

const Heading2XLarge = styled.h2({
  ...proseHeading2XlStyle,
  margin: 0,
});

const HeadingXLarge = styled.h3({
  ...proseHeadingXlStyle,
  margin: 0,
});

const HeadingLarge = styled.h4({
  ...proseHeadingLgStyle,
  margin: 0,
});

const HeadingMedium = styled.h5({
  ...proseHeadingMdStyle,
  margin: 0,
});

const HeadingSmall = styled.h6({
  ...proseHeadingSmStyle,
  margin: 0,
});

const TextXLarge = styled.p({
  ...proseTextXlStyle,
  margin: 0,
});

const TextLarge = styled.p({
  ...proseTextLgStyle,
  margin: 0,
});

const TextMedium = styled.p({
  ...proseTextMdStyle,
  margin: 0,
});

const TextSmallStyled = styled.p({
  ...proseTextSmStyle,
  margin: 0,
});

const TextXSmall = styled.p({
  ...proseTextXsStyle,
  margin: 0,
});

const Text2XSmall = styled.p({
  ...proseText2XsStyle,
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
        <Heading2XLarge>Heading 2xl</Heading2XLarge>
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
        <Text2XSmall>text 2xs</Text2XSmall>
      </EmotionTypographyWrapper>
    </>
  );
};
