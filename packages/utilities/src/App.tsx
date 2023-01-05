import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  textFluidXSmall,
  textXSmallStatic,
  textFluidSmall,
  textStaticSmall,
  textFluidMedium,
  textMediumStatic,
  textFluidLarge,
  textLargeStatic,
  textFluidXLarge,
  textXLargeStatic,
  headingFluidSmall,
  headingSmallStatic,
  headingFluidMedium,
  headingMediumStatic,
  headingFluidLarge,
  headingLargeStatic,
  headingFluidXLarge,
  headingXLargeStatic,
  headingFluidXXLarge,
  headingXXLargeStatic,
  headingXXXLargeFluid,
  headingXXXLargeStatic,
  displayMediumFluid,
  displayMediumStatic,
  displayFluidLarge,
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
  ...textFluidXSmall,
  fontSize: '.75rem',
  color: 'deeppink',
});

const textFluidXSmall = styled.div(textFluidXSmall);
const textFluidSmall = styled.div(textFluidSmall);
const textFluidMedium = styled.div(textFluidMedium);
const textFluidLarge = styled.div(textFluidLarge);
const textFluidXLarge = styled.div(textFluidXLarge);

const TextXSmallStatic = styled.div(textXSmallStatic);
const textStaticSmall = styled.div(textStaticSmall);
const TextMediumStatic = styled.div(textMediumStatic);
const TextLargeStatic = styled.div(textLargeStatic);
const TextXLargeStatic = styled.div(textXLargeStatic);

const headingFluidSmall = styled.div(headingFluidSmall);
const headingFluidMedium = styled.div(headingFluidMedium);
const headingFluidLarge = styled.div(headingFluidLarge);
const headingFluidXLarge = styled.div(headingFluidXLarge);
const headingFluidXXLarge = styled.div(headingFluidXXLarge);
const HeadingXXXLargeFluid = styled.div(headingXXXLargeFluid);

const HeadingSmallStatic = styled.div(headingSmallStatic);
const HeadingMediumStatic = styled.div(headingMediumStatic);
const HeadingLargeStatic = styled.div(headingLargeStatic);
const HeadingXLargeStatic = styled.div(headingXLargeStatic);
const HeadingXXLargeStatic = styled.div(headingXXLargeStatic);
const HeadingXXXLargeStatic = styled.div(headingXXXLargeStatic);

const DisplayMediumFluid = styled.div(displayMediumFluid);
const displayFluidLarge = styled.div(displayFluidLarge);

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
          <textFluidXSmall>
            <Info>textFluidXSmall</Info>
            {dummyText}
          </textFluidXSmall>
          <textFluidSmall>
            <Info>textFluidSmall</Info>
            {dummyText}
          </textFluidSmall>
          <textFluidMedium>
            <Info>textFluidMedium</Info>
            {dummyText}
          </textFluidMedium>
          <textFluidLarge>
            <Info>textFluidLarge</Info>
            {dummyText}
          </textFluidLarge>
          <textFluidXLarge>
            <Info>textFluidXLarge</Info>
            {dummyText}
          </textFluidXLarge>
        </Typography>
        <Typography>
          <TextXSmallStatic>
            <Info>TextXSmallStatic</Info>
            {dummyText}
          </TextXSmallStatic>
          <textStaticSmall>
            <Info>textStaticSmall</Info>
            {dummyText}
          </textStaticSmall>
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
          <headingFluidSmall>
            <Info>headingFluidSmall</Info>
            {dummyText}
          </headingFluidSmall>
          <headingFluidMedium>
            <Info>headingFluidMedium</Info>
            {dummyText}
          </headingFluidMedium>
          <headingFluidLarge>
            <Info>headingFluidLarge</Info>
            {dummyText}
          </headingFluidLarge>
          <headingFluidXLarge>
            <Info>headingFluidXLarge</Info>
            {dummyText}
          </headingFluidXLarge>
          <headingFluidXXLarge>
            <Info>headingFluidXXLarge</Info>
            {dummyText}
          </headingFluidXXLarge>
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
          <displayFluidLarge>
            <Info>displayFluidLarge</Info>
            {dummyText}
          </displayFluidLarge>
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
