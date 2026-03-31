import styled from '@emotion/styled';
import {
  proseHeading2XlStyle,
  proseHeading2XsStyle,
  proseHeading3XlStyle,
  proseHeading4XlStyle,
  proseHeading5XlStyle,
  proseHeadingLgStyle,
  proseHeadingMdStyle,
  proseHeadingSmStyle,
  proseHeadingXlStyle,
  proseHeadingXsStyle,
  proseText2XlStyle,
  proseText2XsStyle,
  proseText3XlStyle,
  proseText4XlStyle,
  proseText5XlStyle,
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

const Heading5Xl = styled.h2({
  ...proseHeading5XlStyle,
  margin: 0,
});

const Heading4Xl = styled.h2({
  ...proseHeading4XlStyle,
  margin: 0,
});

const Heading3Xl = styled.h2({
  ...proseHeading3XlStyle,
  margin: 0,
});

const Heading2Xl = styled.h2({
  ...proseHeading2XlStyle,
  margin: 0,
});

const HeadingXl = styled.h3({
  ...proseHeadingXlStyle,
  margin: 0,
});

const HeadingLg = styled.h4({
  ...proseHeadingLgStyle,
  margin: 0,
});

const HeadingMd = styled.h5({
  ...proseHeadingMdStyle,
  margin: 0,
});

const HeadingSm = styled.h6({
  ...proseHeadingSmStyle,
  margin: 0,
});

const HeadingXs = styled.h6({
  ...proseHeadingXsStyle,
  margin: 0,
});

const Heading2Xs = styled.h6({
  ...proseHeading2XsStyle,
  margin: 0,
});

const Text5Xl = styled.p({
  ...proseText5XlStyle,
  margin: 0,
});

const Text4Xl = styled.p({
  ...proseText4XlStyle,
  margin: 0,
});

const Text3Xl = styled.p({
  ...proseText3XlStyle,
  margin: 0,
});

const Text2Xl = styled.p({
  ...proseText2XlStyle,
  margin: 0,
});

const TextXl = styled.p({
  ...proseTextXlStyle,
  margin: 0,
});

const TextLg = styled.p({
  ...proseTextLgStyle,
  margin: 0,
});

const TextMd = styled.p({
  ...proseTextMdStyle,
  margin: 0,
});

const TextSm = styled.p({
  ...proseTextSmStyle,
  margin: 0,
});

const TextXs = styled.p({
  ...proseTextXsStyle,
  margin: 0,
});

const Text2Xs = styled.p({
  ...proseText2XsStyle,
  margin: 0,
});

export const EmotionTypography = () => {
  return (
    <>
      <EmotionTypographyWrapper>
        <Heading5Xl>Heading 5xl</Heading5Xl>
        <Heading4Xl>Heading 4xl</Heading4Xl>
        <Heading3Xl>Heading 3xl</Heading3Xl>
        <Heading2Xl>Heading 2xl</Heading2Xl>
        <HeadingXl>Heading xl</HeadingXl>
        <HeadingLg>Heading lg</HeadingLg>
        <HeadingMd>Heading md</HeadingMd>
        <HeadingSm>Heading sm</HeadingSm>
        <HeadingXs>Heading xs</HeadingXs>
        <Heading2Xs>Heading 2xs</Heading2Xs>
      </EmotionTypographyWrapper>
      <EmotionTypographyWrapper>
        <Text5Xl>Text 5xl</Text5Xl>
        <Text4Xl>Text 4xl</Text4Xl>
        <Text3Xl>Text 3xl</Text3Xl>
        <Text2Xl>Text 2xl</Text2Xl>
        <TextXl>Text xl</TextXl>
        <TextLg>Text lg</TextLg>
        <TextMd>Text md</TextMd>
        <TextSm>Text sm</TextSm>
        <TextXs>Text xs</TextXs>
        <Text2Xs>Text 2xs</Text2Xs>
      </EmotionTypographyWrapper>
    </>
  );
};
