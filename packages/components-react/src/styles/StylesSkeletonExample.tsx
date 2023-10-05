import styled from 'styled-components';
import {
  fontLineHeight,
  fontSizeTextSmall,
  fontSizeTextMedium,
  fontSizeTextLarge,
  getSkeletonStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
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

// Skeletons
const SkeletonBorderRadiusSmall = styled.div(getSkeletonStyle({ borderRadius: 'small' }));
const SkeletonBorderRadiusMedium = styled.div(getSkeletonStyle({ borderRadius: 'medium' }));

const SkeletonSquareSmall = styled(SkeletonBorderRadiusSmall)({
  height: '100px',
  width: '100px',
});
const SkeletonSquareMedium = styled(SkeletonBorderRadiusMedium)({
  height: '100px',
  width: '100px',
});

const SkeletonText = styled(SkeletonBorderRadiusSmall)({
  height: fontLineHeight,
  width: '100px',
});

const SkeletonTextSmall = styled(SkeletonText)({
  fontSize: fontSizeTextSmall,
});
const SkeletonTextMedium = styled(SkeletonText)({
  fontSize: fontSizeTextMedium,
});
const SkeletonTextLarge = styled(SkeletonText)({
  fontSize: fontSizeTextLarge,
});

export const StylesSkeletonExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Skeletons Square</Heading>
        <SkeletonSquareSmall />
        <SkeletonSquareMedium />
      </Wrapper>

      <Wrapper>
        <Heading>Skeletons Heading/Text</Heading>
        <SkeletonTextSmall />
        <SkeletonTextMedium />
        <SkeletonTextLarge />
      </Wrapper>
    </>
  );
};
