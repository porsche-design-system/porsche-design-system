import styled from 'styled-components';
import {
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  getSkeletonStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
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

// Skeletons
const skeletonLightStyle = getSkeletonStyle({ theme: 'light' });
const skeletonDarkStyle = getSkeletonStyle({ theme: 'dark' });

const SkeletonBox = styled.div({
  height: '200px',
  width: '500px',
});
const SkeletonBoxLight = styled(SkeletonBox)(skeletonLightStyle);
const SkeletonBoxDark = styled(SkeletonBox)(skeletonDarkStyle);

const SkeletonText = styled.div({
  height: fontLineHeight,
  width: '100px',
});

const SkeletonTextSmallLight = styled(SkeletonText)({
  ...skeletonLightStyle,
  fontSize: fontSizeTextSmall,
});
const SkeletonTextMediumLight = styled(SkeletonText)({
  ...skeletonLightStyle,
  fontSize: fontSizeTextMedium,
});
const SkeletonTextLargeLight = styled(SkeletonText)({
  ...skeletonLightStyle,
  fontSize: fontSizeTextLarge,
});

const SkeletonTextSmallDark = styled(SkeletonText)({
  ...skeletonDarkStyle,
  fontSize: fontSizeTextSmall,
});
const SkeletonTextMediumDark = styled(SkeletonText)({
  ...skeletonDarkStyle,
  fontSize: fontSizeTextMedium,
});
const SkeletonTextLargeDark = styled(SkeletonText)({
  ...skeletonDarkStyle,
  fontSize: fontSizeTextLarge,
});

export const StylesSkeletonExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <Heading>Skeleton Light</Heading>
        <SkeletonBoxLight />
      </WrapperLight>
      <WrapperLight>
        <SkeletonTextSmallLight />
        <SkeletonTextMediumLight />
        <SkeletonTextLargeLight />
      </WrapperLight>

      <WrapperDark>
        <Heading>Skeleton Dark</Heading>
        <SkeletonBoxDark />
      </WrapperDark>
      <WrapperDark>
        <SkeletonTextSmallDark />
        <SkeletonTextMediumDark />
        <SkeletonTextLargeDark />
      </WrapperDark>
    </>
  );
};
