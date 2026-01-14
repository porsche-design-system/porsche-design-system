import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  textXSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
const Heading = styled.h3({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

// Tile
const tileBaseStyle = {
  ...textSmallStyle,
  color: themeDarkPrimary,
  background: themeDarkBackgroundBase,
  padding: spacingFluidMedium,
};

// Border Radius
const BorderRadiusSmall = styled.div({
  ...tileBaseStyle,
  borderRadius: borderRadiusSmall,
});

const BorderRadiusMedium = styled.div({
  ...tileBaseStyle,
  borderRadius: borderRadiusMedium,
});

const BorderRadiusLarge = styled.div({
  ...tileBaseStyle,
  borderRadius: borderRadiusLarge,
});

// Border Width
const BorderWidthBase = styled.div({
  width: '100%',
  borderBottom: `${borderWidthBase} solid ${themeLightPrimary}`,
  '&::before': {
    ...textXSmallStyle,
    content: '"Base"',
    color: themeLightPrimary,
  },
});

const BorderWidthThin = styled.div({
  width: '100%',
  borderBottom: `${borderWidthThin} solid ${themeLightPrimary}`,
  '&::before': {
    ...textXSmallStyle,
    content: '"Thin"',
    color: themeLightPrimary,
  },
});

export const StylesBorderExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Border Radius</Heading>
        <BorderRadiusSmall>Small</BorderRadiusSmall>
        <BorderRadiusMedium>Medium</BorderRadiusMedium>
        <BorderRadiusLarge>Large</BorderRadiusLarge>
      </Wrapper>
      <Wrapper>
        <Heading>Border Width</Heading>
        <BorderWidthBase />
        <BorderWidthThin />
      </Wrapper>
    </>
  );
};
