import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  gridStyle,
  gridGap,
  getMediaQueryMax,
  getMediaQueryMin,
  displayLargeStyle,
  displayMediumStyle,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
  headingXXXLargeStyle,
  textLargeStyle,
  textMediumStyle,
  textXLargeStyle,
  textXSmallStyle,
} from '@porsche-design-system/utilities-v2';

const dummyText = 'The quick brown fox jumps over the lazy dog';

const gridColumnFluidStart = 'fluid-start';
const gridColumnFluidEnd = 'fluid-end';
const gridColumnExtendedStart = 'extended-start';
const gridColumnExtendedEnd = 'extended-end';
const gridColumnBasicStart = 'basic-start';
const gridColumnBasicEnd = 'basic-end';

const gridSpanOneHalf = 'var(--pds-grid-span-one-half)';
const gridSpanOneThird = 'var(--pds-grid-span-one-third)';
const gridSpanTwoThirds = 'var(--pds-grid-span-two-thirds)';
const gridSpanOneQuarter = 'var(--pds-grid-span-one-quarter)';
const gridSpanThreeQuarters = 'var(--pds-grid-span-three-quarters)';

const Grid = styled.div({
  ...gridStyle,
  position: 'relative',
  margin: `${gridGap} 0`,
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

const SubGrid = styled.div({
  display: 'grid',
  gridColumn: `${gridColumnBasicStart} / ${gridColumnBasicEnd}`,
  gridTemplateColumns: 'subgrid',
});

const SubGridColumnOneThird = styled.div({
  gridColumn: gridSpanOneThird,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"One Third"',
  },
});

const GridColumnFluid = styled.div({
  gridColumn: `${gridColumnFluidStart} / ${gridColumnFluidEnd}`,
  padding: '200px 0',
  background: 'blue',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Fluid / Full Width"',
  },
});

const GridColumnExtended = styled.div({
  gridColumn: `${gridColumnExtendedStart} / ${gridColumnExtendedEnd}`,
  padding: '200px 0',
  background: 'blue',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Extended / Basic-Extended"',
  },
});

const GridColumnBasic = styled.div({
  gridColumn: `${gridColumnBasicStart} / ${gridColumnBasicEnd}`,
  padding: '200px 0',
  background: 'blue',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Basic / Basic-Narrow"',
  },
});

const GridColumnHalf = styled.div({
  gridColumn: `${gridColumnBasicStart} / ${gridSpanOneHalf}`,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Half"',
  },
});

const GridColumnOneThird = styled.div({
  gridColumn: `${gridColumnBasicStart} / ${gridSpanOneThird}`,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"One Third"',
  },
});

const GridColumnTwoThirds = styled.div({
  gridColumn: gridSpanTwoThirds,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Two Thirds"',
  },
});

const GridSpanOneQuarter = styled.div({
  gridColumn: `${gridColumnBasicStart} / ${gridSpanOneQuarter}`,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"One Quarter"',
  },
});

const GridSpanThreeQuarters = styled.div({
  gridColumn: gridSpanThreeQuarters,
  padding: '50px 0',
  background: 'deeppink',
  textAlign: 'center',
  color: 'white',
  '&::before': {
    content: '"Three Quarters"',
  },
});

const Typography = styled.div({
  display: 'grid',
  gridGap: '16px',
  gridColumn: `${gridColumnBasicStart} / ${gridColumnBasicEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: gridSpanOneHalf,
    '&:nth-child(odd)': {
      gridColumn: `${gridColumnBasicStart} / ${gridSpanOneHalf}`,
    },
  },
});

const Info = styled.div({
  ...textXSmallStyle,
  fontSize: '.75rem',
  color: 'deeppink',
});

const TextXSmallStatic = styled.div(textXSmallStyle);
const TextMediumStatic = styled.div(textMediumStyle);
const TextLargeStatic = styled.div(textLargeStyle);
const TextXLargeStatic = styled.div(textXLargeStyle);

const HeadingXXXLargeFluid = styled.div(headingXXXLargeStyle);

const HeadingSmallStatic = styled.div(headingSmallStyle);
const HeadingMediumStatic = styled.div(headingMediumStyle);
const HeadingLargeStatic = styled.div(headingLargeStyle);
const HeadingXLargeStatic = styled.div(headingXLargeStyle);
const HeadingXXLargeStatic = styled.div(headingXXLargeStyle);
const HeadingXXXLargeStatic = styled.div(headingXXXLargeStyle);

const DisplayMediumFluid = styled.div(displayMediumStyle);

const DisplayMediumStatic = styled.div(displayMediumStyle);
const DisplayLargeStatic = styled.div(displayLargeStyle);

function App() {
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
        <GridColumnFluid />
        <GridColumnExtended />
        <GridColumnBasic />
        <GridColumnHalf />
        <GridColumnOneThird />
        <GridColumnTwoThirds />
        <GridSpanOneQuarter />
        <GridSpanThreeQuarters />
      </Grid>
      <Grid>
        <SubGrid>
          <SubGridColumnOneThird></SubGridColumnOneThird>
          <SubGridColumnOneThird></SubGridColumnOneThird>
          <SubGridColumnOneThird></SubGridColumnOneThird>
        </SubGrid>
      </Grid>
      <Grid>
        <Typography></Typography>
        <Typography>
          <TextXSmallStatic>
            <Info>TextXSmallStatic</Info>
            {dummyText}
          </TextXSmallStatic>
          <TextMediumStatic>
            <Info>TextMediumStatic</Info>
            {dummyText}
          </TextMediumStatic>
          <TextLargeStatic>
            <Info>TextLargeStatic</Info>
            {dummyText}
          </TextLargeStatic>
          <TextXLargeStatic>
            <Info>TextXLargeStatic</Info>
            {dummyText}
          </TextXLargeStatic>
        </Typography>
      </Grid>
      <Grid>
        <Typography>
          <HeadingXXXLargeFluid>
            <Info>HeadingXXXLargeFluid</Info>
            {dummyText}
          </HeadingXXXLargeFluid>
        </Typography>
        <Typography>
          <HeadingSmallStatic>
            <Info>HeadingSmallStatic</Info>
            {dummyText}
          </HeadingSmallStatic>
          <HeadingMediumStatic>
            <Info>HeadingMediumStatic</Info>
            {dummyText}
          </HeadingMediumStatic>
          <HeadingLargeStatic>
            <Info>HeadingLargeStatic</Info>
            {dummyText}
          </HeadingLargeStatic>
          <HeadingXLargeStatic>
            <Info>HeadingXLargeStatic</Info>
            {dummyText}
          </HeadingXLargeStatic>
          <HeadingXXLargeStatic>
            <Info>HeadingXXLargeStatic</Info>
            {dummyText}
          </HeadingXXLargeStatic>
          <HeadingXXXLargeStatic>
            <Info>HeadingXXXLargeStatic</Info>
            {dummyText}
          </HeadingXXXLargeStatic>
        </Typography>
      </Grid>
      <Grid>
        <Typography>
          <DisplayMediumFluid>
            <Info>DisplayMediumFluid</Info>
            {dummyText}
          </DisplayMediumFluid>
        </Typography>
        <Typography>
          <DisplayMediumStatic>
            <Info>DisplayMediumStatic</Info>
            {dummyText}
          </DisplayMediumStatic>
          <DisplayLargeStatic>
            <Info>DisplayLargeStatic</Info>
            {dummyText}
          </DisplayLargeStatic>
        </Typography>
      </Grid>
    </Fragment>
  );
}

export default App;
