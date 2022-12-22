import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  textXSmallFluid,
  textXSmallStatic,
  textSmallFluid,
  textSmallStatic,
  textMediumFluid,
  textMediumStatic,
  textLargeFluid,
  textLargeStatic,
  textXLargeFluid,
  textXLargeStatic,
  headingSmallFluid,
  headingSmallStatic,
  headingMediumFluid,
  headingMediumStatic,
  headingLargeFluid,
  headingLargeStatic,
  headingXLargeFluid,
  headingXLargeStatic,
  headingXXLargeFluid,
  headingXXLargeStatic,
  headingXXXLargeFluid,
  headingXXXLargeStatic,
  displayMediumFluid,
  displayMediumStatic,
  displayLargeFluid,
  displayLargeStatic,
  grid,
  gridGap,
  mediaQueryMin,
  mediaQueryMax,
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
  ...grid,
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
  [mediaQueryMax('s')]: {
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
  [mediaQueryMin('s')]: {
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
  [mediaQueryMin('s')]: {
    gridColumn: gridSpanOneHalf,
    '&:nth-child(odd)': {
      gridColumn: `${gridColumnBasicStart} / ${gridSpanOneHalf}`,
    },
  },
});

const Info = styled.div({
  ...textXSmallFluid,
  fontSize: '.75rem',
  color: 'deeppink',
});

const TextXSmallFluid = styled.div(textXSmallFluid);
const TextSmallFluid = styled.div(textSmallFluid);
const TextMediumFluid = styled.div(textMediumFluid);
const TextLargeFluid = styled.div(textLargeFluid);
const TextXLargeFluid = styled.div(textXLargeFluid);

const TextXSmallStatic = styled.div(textXSmallStatic);
const TextSmallStatic = styled.div(textSmallStatic);
const TextMediumStatic = styled.div(textMediumStatic);
const TextLargeStatic = styled.div(textLargeStatic);
const TextXLargeStatic = styled.div(textXLargeStatic);

const HeadingSmallFluid = styled.div(headingSmallFluid);
const HeadingMediumFluid = styled.div(headingMediumFluid);
const HeadingLargeFluid = styled.div(headingLargeFluid);
const HeadingXLargeFluid = styled.div(headingXLargeFluid);
const HeadingXXLargeFluid = styled.div(headingXXLargeFluid);
const HeadingXXXLargeFluid = styled.div(headingXXXLargeFluid);

const HeadingSmallStatic = styled.div(headingSmallStatic);
const HeadingMediumStatic = styled.div(headingMediumStatic);
const HeadingLargeStatic = styled.div(headingLargeStatic);
const HeadingXLargeStatic = styled.div(headingXLargeStatic);
const HeadingXXLargeStatic = styled.div(headingXXLargeStatic);
const HeadingXXXLargeStatic = styled.div(headingXXXLargeStatic);

const DisplayMediumFluid = styled.div(displayMediumFluid);
const DisplayLargeFluid = styled.div(displayLargeFluid);

const DisplayMediumStatic = styled.div(displayMediumStatic);
const DisplayLargeStatic = styled.div(displayLargeStatic);

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
        <Typography>
          <TextXSmallFluid>
            <Info>TextXSmallFluid</Info>
            {dummyText}
          </TextXSmallFluid>
          <TextSmallFluid>
            <Info>TextSmallFluid</Info>
            {dummyText}
          </TextSmallFluid>
          <TextMediumFluid>
            <Info>TextMediumFluid</Info>
            {dummyText}
          </TextMediumFluid>
          <TextLargeFluid>
            <Info>TextLargeFluid</Info>
            {dummyText}
          </TextLargeFluid>
          <TextXLargeFluid>
            <Info>TextXLargeFluid</Info>
            {dummyText}
          </TextXLargeFluid>
        </Typography>
        <Typography>
          <TextXSmallStatic>
            <Info>TextXSmallStatic</Info>
            {dummyText}
          </TextXSmallStatic>
          <TextSmallStatic>
            <Info>TextSmallStatic</Info>
            {dummyText}
          </TextSmallStatic>
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
          <HeadingSmallFluid>
            <Info>HeadingSmallFluid</Info>
            {dummyText}
          </HeadingSmallFluid>
          <HeadingMediumFluid>
            <Info>HeadingMediumFluid</Info>
            {dummyText}
          </HeadingMediumFluid>
          <HeadingLargeFluid>
            <Info>HeadingLargeFluid</Info>
            {dummyText}
          </HeadingLargeFluid>
          <HeadingXLargeFluid>
            <Info>HeadingXLargeFluid</Info>
            {dummyText}
          </HeadingXLargeFluid>
          <HeadingXXLargeFluid>
            <Info>HeadingXXLargeFluid</Info>
            {dummyText}
          </HeadingXXLargeFluid>
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
          <DisplayLargeFluid>
            <Info>DisplayLargeFluid</Info>
            {dummyText}
          </DisplayLargeFluid>
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
