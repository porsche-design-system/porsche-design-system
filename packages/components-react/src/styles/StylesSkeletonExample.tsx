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

// Skeletons shared
const SkeletonLight = styled.div(getSkeletonStyle({ theme: 'light' }));
const SkeletonDark = styled.div(getSkeletonStyle({ theme: 'dark' }));

// Skeletons box
const boxStyles = {
  height: '200px',
  width: '500px',
};
const SkeletonBoxLight = styled(SkeletonLight)(boxStyles);
const SkeletonBoxDark = styled(SkeletonDark)(boxStyles);

// Skeletons text
const textStyles = {
  height: fontLineHeight,
  width: '100px',
};
const SkeletonTextLight = styled(SkeletonLight)(textStyles);
const SkeletonTextSmallLight = styled(SkeletonTextLight)({ fontSize: fontSizeTextSmall });
const SkeletonTextMediumLight = styled(SkeletonTextLight)({ fontSize: fontSizeTextMedium });
const SkeletonTextLargeLight = styled(SkeletonTextLight)({ fontSize: fontSizeTextLarge });

const SkeletonTextDark = styled(SkeletonDark)(textStyles);
const SkeletonTextSmallDark = styled(SkeletonTextDark)({ fontSize: fontSizeTextSmall });
const SkeletonTextMediumDark = styled(SkeletonTextDark)({ fontSize: fontSizeTextMedium });
const SkeletonTextLargeDark = styled(SkeletonTextDark)({ fontSize: fontSizeTextLarge });

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
