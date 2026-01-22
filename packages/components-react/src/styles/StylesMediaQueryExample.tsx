import styled from '@emotion/styled';
import {
  breakpointBase,
  breakpointL,
  breakpointM,
  breakpointS,
  breakpointXL,
  breakpointXS,
  breakpointXXL,
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeLightPrimary,
} from '@porsche-design-system/components-react/emotion';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
const getTypographyStyle = {
  ...textSmallStyle,
  color: themeLightPrimary,
  margin: 0,
};

const Heading = styled.h3({
  ...headingMediumStyle,
  color: themeLightPrimary,
  margin: 0,
});

// MediaQueryMin
const MediaQueryMin = styled.p({
  ...getTypographyStyle,
  [getMediaQueryMin('base')]: {
    '&::after': {
      content: '" Base"',
    },
  },
  [getMediaQueryMin('xs')]: {
    '&::after': {
      content: '" XS"',
    },
  },
  [getMediaQueryMin('s')]: {
    '&::after': {
      content: '" S"',
    },
  },
  [getMediaQueryMin('m')]: {
    '&::after': {
      content: '" M"',
    },
  },
  [getMediaQueryMin('l')]: {
    '&::after': {
      content: '" L"',
    },
  },
  [getMediaQueryMin('xl')]: {
    '&::after': {
      content: '" XL"',
    },
  },
  [getMediaQueryMin('xxl')]: {
    '&::after': {
      content: '" XXL"',
    },
  },
});

// MediaQueryMax
const MediaQueryMax = styled.p({
  ...getTypographyStyle,
  [getMediaQueryMax('xxl')]: {
    '&::after': {
      content: '" XXL"',
    },
  },
  [getMediaQueryMax('xl')]: {
    '&::after': {
      content: '" XL"',
    },
  },
  [getMediaQueryMax('l')]: {
    '&::after': {
      content: '" L"',
    },
  },
  [getMediaQueryMax('m')]: {
    '&::after': {
      content: '" M"',
    },
  },
  [getMediaQueryMax('s')]: {
    '&::after': {
      content: '" S"',
    },
  },
  [getMediaQueryMax('xs')]: {
    '&::after': {
      content: '" XS"',
    },
  },
});

// MediaQueryMinMax
const MediaQueryMinMax = styled.p({
  ...getTypographyStyle,
  [getMediaQueryMinMax('base', 'xs')]: {
    '&::after': {
      content: '" Base - XS"',
    },
  },
  [getMediaQueryMinMax('xs', 's')]: {
    '&::after': {
      content: '" XS - S"',
    },
  },
  [getMediaQueryMinMax('s', 'm')]: {
    '&::after': {
      content: '" S - M"',
    },
  },
  [getMediaQueryMinMax('m', 'l')]: {
    '&::after': {
      content: '" M - L"',
    },
  },
  [getMediaQueryMinMax('l', 'xl')]: {
    '&::after': {
      content: '" L - XL"',
    },
  },
  [getMediaQueryMinMax('xl', 'xxl')]: {
    '&::after': {
      content: '" XL - XXL"',
    },
  },
});

// Breakpoint
const BreakpointBase = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointBase}px"`,
  },
});

const BreakpointXS = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointXS}px"`,
  },
});

const BreakpointS = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointS}px"`,
  },
});

const BreakpointM = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointM}px"`,
  },
});

const BreakpointL = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointL}px"`,
  },
});

const BreakpointXL = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointXL}px"`,
  },
});

const BreakpointXXL = styled.p({
  ...getTypographyStyle,
  '&::after': {
    content: `" ${breakpointXXL}px"`,
  },
});

export const StylesMediaQueryExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Media Query (change viewport to see effect)</Heading>
        <MediaQueryMin>Media Query Min:</MediaQueryMin>
        <MediaQueryMax>Media Query Max:</MediaQueryMax>
        <MediaQueryMinMax>Media Query Min Max:</MediaQueryMinMax>
      </Wrapper>
      <Wrapper>
        <Heading>Breakpoint</Heading>
        <BreakpointBase>Breakpoint Base:</BreakpointBase>
        <BreakpointXS>Breakpoint XS:</BreakpointXS>
        <BreakpointS>Breakpoint S:</BreakpointS>
        <BreakpointM>Breakpoint M:</BreakpointM>
        <BreakpointL>Breakpoint L:</BreakpointL>
        <BreakpointXL>Breakpoint XL:</BreakpointXL>
        <BreakpointXXL>Breakpoint XXL:</BreakpointXXL>
      </Wrapper>
    </>
  );
};
