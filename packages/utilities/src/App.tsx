import { Fragment, type JSX } from 'react';
import styled from 'styled-components';
import {
  getMediaQueryMax,
  getMediaQueryMin,
  gridBasicColumnEnd,
  gridBasicColumnStart,
  gridBasicSpanOneHalf,
  gridBasicSpanOneThird,
  gridBasicSpanTwoThirds,
  gridExtendedColumnEnd,
  gridExtendedColumnStart,
  gridExtendedSpanOneHalf,
  gridFullColumnEnd,
  gridFullColumnStart,
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowSpanOneHalf,
  gridStyle,
  spacingFluidXLarge,
  textMediumStyle,
} from '@porsche-design-system/components-js/styles';

const Grid = styled.div({
  ...gridStyle,
  position: 'relative',
  margin: `${spacingFluidXLarge} 0`,
  '&:first-child': {
    margin: 0,
    position: 'fixed',
    inset: 0,
  },
});

const GridColumnMobile = styled.div({
  display: 'none',
  [getMediaQueryMax('s')]: {
    display: 'block',
    transform: 'translate3d(0, 0 , 0)',
    '::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '100%',
      background: 'rgba(0, 0, 255, 0.1)',
    },
  },
});

const GridColumnDesktop = styled.div({
  display: 'none',
  [getMediaQueryMin('s')]: {
    display: 'block',
    transform: 'translate3d(0, 0 , 0)',
    '::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '100%',
      background: 'rgba(0, 0, 255, 0.1)',
    },
  },
});

type Color = 'blue' | 'green' | 'purple' | 'yellow';
const getBoxStyles = (color: Color, content: string) => {
  const opacity = 0.5;
  const colorMap: { [key in Color]: string } = {
    blue: `rgba(0, 0, 255, ${opacity})`,
    green: `rgba(0, 255, 0, ${opacity})`,
    purple: `rgba(255, 0, 255, ${opacity})`,
    yellow: `rgba(255, 255, 0, ${opacity})`,
  };
  return {
    padding: '100px 0',
    background: colorMap[color],
    textAlign: 'center',
    color: 'deeppink',
    ...textMediumStyle,
    '&::before': {
      content: `'${content}'`,
    },
  } as const;
};

// Grid Full
const GridFull = styled.div({
  ...getBoxStyles('blue', 'Full'),
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
});

// Grid Extended
const GridExtended = styled.div({
  ...getBoxStyles('green', 'Extended'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
});

const GridExtendedColumnHalfLeft = styled.div({
  ...getBoxStyles('green', 'Base: Half'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
});

const GridExtendedColumnHalfRight = styled.div({
  ...getBoxStyles('green', 'Base: Half'),
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
});

// Grid Basic
const GridBasic = styled.div({
  ...getBoxStyles('purple', 'Basic'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
});

const GridBaseColumnHalfLeft = styled.div({
  ...getBoxStyles('purple', 'Base: Half'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
});

const GridBaseColumnHalfRight = styled.div({
  ...getBoxStyles('purple', 'Base: Half'),
  gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
});

const GridBaseColumnOneThirdLeft = styled.div({
  ...getBoxStyles('purple', 'Base: One Third'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
});

const GridBaseColumnOneThirdFollow = styled.div({
  ...getBoxStyles('purple', 'Base: One Third'),
  gridColumn: `${gridBasicSpanOneThird}`,
});

const GridBaseColumnTwoThirdsRight = styled.div({
  ...getBoxStyles('purple', 'Base: Two Thirds'),
  gridColumn: `${gridBasicSpanTwoThirds} / ${gridBasicColumnEnd}`,
});

const GridBaseColumnOneThirdRight = styled.div({
  ...getBoxStyles('purple', 'Base: One Third'),
  gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
});

const GridBaseColumnTwoThirdsLeft = styled.div({
  ...getBoxStyles('purple', 'Base: Two Thirds'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
});

// Grid Narrow
const GridNarrow = styled.div({
  ...getBoxStyles('yellow', 'Narrow'),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
});

const GridNarrowColumnHalfLeft = styled.div({
  ...getBoxStyles('yellow', 'Base: Half'),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
});

const GridNarrowColumnHalfRight = styled.div({
  ...getBoxStyles('yellow', 'Base: Half'),
  gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
});

export const App = (): JSX.Element => {
  return (
    <Fragment>
      <Grid>
        {[...Array(8)].map((_, i) => (
          <GridColumnMobile key={i} />
        ))}
        {[...Array(16)].map((_, i) => (
          <GridColumnDesktop key={i} />
        ))}
      </Grid>
      <Grid>
        <GridFull />
      </Grid>
      <Grid>
        <GridExtended />
        <GridExtendedColumnHalfLeft />
        <GridExtendedColumnHalfRight />
      </Grid>
      <Grid>
        <GridBasic />
        <GridBaseColumnHalfLeft />
        <GridBaseColumnHalfRight />
        <GridBaseColumnOneThirdLeft />
        <GridBaseColumnOneThirdFollow />
        <GridBaseColumnOneThirdFollow />
        <GridBaseColumnOneThirdLeft />
        <GridBaseColumnTwoThirdsRight />
        <GridBaseColumnTwoThirdsLeft />
        <GridBaseColumnOneThirdRight />
      </Grid>
      <Grid>
        <GridNarrow />
        <GridNarrowColumnHalfLeft />
        <GridNarrowColumnHalfRight />
      </Grid>
    </Fragment>
  );
};
