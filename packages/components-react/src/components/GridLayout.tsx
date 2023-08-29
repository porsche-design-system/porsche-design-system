import { PAccordion, PButton } from '@porsche-design-system/components-react';
import type { AccordionUpdateEvent } from '@porsche-design-system/components-react';
import styled from 'styled-components';
import {
  borderRadiusLarge,
  borderRadiusSmall,
  displayLargeStyle,
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
  gridGap,
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowSpanOneHalf,
  gridStyle,
  gridWideColumnEnd,
  gridWideColumnStart,
  headingLargeStyle,
  headingXLargeStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
  textXSmallStyle,
  themeLightPrimary,
  themeLightStateHover,
} from '@porsche-design-system/components-react/styles';
import { useCallback, useState } from 'react';

// VisualizeGrid
const VisualizeGrid = styled.div({
  ...gridStyle,
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
});

const VisualizeGridColumns = styled.span({
  background: 'rgba(0, 0, 255, 0.1)',
  '&:first-child,&:last-child': {
    background: 'rgba(125, 0, 255, 0.1)',
  },
  [getMediaQueryMax('s')]: {
    '&:nth-child(8)': {
      background: 'rgba(125, 0, 255, 0.1)',
    },
    '&:nth-child(n+9)': {
      display: 'none',
    },
  },
});

// Tile
type Color = 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
const getTileStyle = (color: Color, padding: 'medium' | 'small' | false = 'medium', borderRadius: boolean = true) => {
  const opacity = 0.25;
  const colorMap: { [key in Color]: string } = {
    blue: `rgba(0, 0, 255, ${opacity})`,
    green: `rgba(0, 255, 0, ${opacity})`,
    purple: `rgba(255, 0, 255, ${opacity})`,
    yellow: `rgba(255, 255, 0, ${opacity})`,
    orange: `rgba(255, 125, 0, ${opacity})`,
  };
  return {
    padding: padding === 'medium' ? spacingFluidMedium : padding === 'small' ? spacingFluidSmall : 0,
    borderRadius: borderRadius ? borderRadiusLarge : 0,
    background: colorMap[color],
  } as const;
};

// Typography
const Info = styled.span({
  ...textXSmallStyle,
  display: 'inline-block',
  verticalAlign: 'top',
  color: themeLightPrimary,
  borderRadius: borderRadiusSmall,
  marginBottom: spacingFluidSmall,
  padding: `${spacingStaticXSmall} ${spacingStaticSmall}`,
  background: themeLightStateHover,
});

const Display = styled.h1({
  ...displayLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

const Heading = styled.h3({
  ...headingLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

const HeadingXLarge = styled.h2({
  ...headingXLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

const Text = styled.p({
  ...textSmallStyle,
  color: themeLightPrimary,
  margin: `${spacingFluidXSmall} 0 0`,
});

const TextLarge = styled.p({
  ...textLargeStyle,
  color: themeLightPrimary,
  margin: `${spacingFluidXSmall} 0 0`,
});

// Hero
const HeroGrid = styled.div({
  ...gridStyle,
  alignItems: 'end',
});

const HeroMedia = styled.div({
  ...getTileStyle('blue', false, false),
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  gridRow: 1,
  height: 'clamp(300px, 50vh, 500px)',
});

const HeroHeader = styled.div({
  ...getTileStyle('green', false, false),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  gridRow: 1,
  paddingBottom: spacingFluidMedium,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

// Wide Content
const WideGrid = styled.div({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

const WideSidebar = styled.div({
  ...getTileStyle('orange'),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridWideColumnStart} / span 5`,
  },
});

const WideContent = styled.div({
  ...getTileStyle('orange'),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `span 11 / ${gridWideColumnEnd}`,
  },
});

// Extended Content
const ExtendedContentGrid = styled.div({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

const ExtendedContentHalfLeft = styled.div({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
});

const ExtendedContentHalfRight = styled.div({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
});

// Masonry
const MasonryGrid = styled.div({
  ...gridStyle,
  marginTop: gridGap,
});

const MasonryCustom1 = styled.div({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridExtendedColumnStart} / span 8`,
    gridRow: 'span 2',
  },
});

const MasonryCustom2 = styled.div({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `span 6 / ${gridExtendedColumnEnd}`,
  },
});

const MasonryCustom3 = styled.div({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `span 5 / ${gridBasicColumnEnd}`,
  },
});

// Teaser
const TeaserGrid = styled.div({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

const TeaserMedia = styled.div({
  ...getTileStyle('blue', false, false),
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  gridRow: 1,
});

const TeaserContent = styled.div({
  ...getTileStyle('purple', false, false),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  gridRow: 1,
  margin: `${spacingFluidLarge} 0`,
});

// Basic Content
const BasicContentGrid = styled.div({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

const BasicContent = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
});

const BasicContentHalfLeft = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
});

const BasicContentHalfRight = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
});

const BasicContentOneThirdLeft = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
  },
});

const BasicContentOneThirdFollow = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridBasicSpanOneThird}`,
  },
});

const BasicContentOneThirdRight = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
  },
});

const BasicContentTwoThirdsLeft = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
  },
});

const BasicContentCustomLeft = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  [getMediaQueryMin('s')]: {
    gridColumn: `${gridBasicColumnStart} / span 5`,
  },
});

const BasicContentCustomRight = styled.div({
  ...getTileStyle('purple'),
  gridColumn: `span 6 / ${gridBasicColumnEnd}`,
});

// Narrow Content
const NarrowContentGrid = styled.div({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

const NarrowContent = styled.div({
  ...getTileStyle('yellow', false),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
});

const NarrowContentHalfLeft = styled.div({
  ...getTileStyle('yellow', 'small'),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
});

const NarrowContentHalfRight = styled.div({
  ...getTileStyle('yellow', 'small'),
  gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
});

export const GridLayout = (props: { gridVisualizer: boolean }): JSX.Element => {
  const [isAccordion1Open, setIsAccordion1Open] = useState<boolean>(false);
  const [isAccordion2Open, setIsAccordion2Open] = useState<boolean>(false);

  const onAccordion1Update = useCallback((e: CustomEvent<AccordionUpdateEvent>) => {
    setIsAccordion1Open(e.detail.open);
  }, []);
  const onAccordion2Update = useCallback((e: CustomEvent<AccordionUpdateEvent>) => {
    setIsAccordion2Open(e.detail.open);
  }, []);

  return (
    <>
      {props.gridVisualizer && (
        <VisualizeGrid>
          {[...Array(18)].map((_, i) => (
            <VisualizeGridColumns key={i} />
          ))}
        </VisualizeGrid>
      )}
      <HeroGrid>
        <HeroMedia>
          <Info style={{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }}>
            <b>Full</b> for Background and Media
          </Info>
        </HeroMedia>
        <HeroHeader>
          <Display>Hero Heading</Display>
          <TextLarge>Subline for the Hero Header in Wide Grid</TextLarge>
        </HeroHeader>
      </HeroGrid>
      <WideGrid>
        <WideSidebar>
          <Info>
            <b>Wide Sidebar</b>
          </Info>
          <PAccordion heading="Some Heading" tag="h3" />
          <PAccordion heading="Some Heading" tag="h3" />
          <PAccordion heading="Some Heading" tag="h3" />
        </WideSidebar>
        <WideContent>
          <Info>
            <b>Wide Content</b>
          </Info>
        </WideContent>
      </WideGrid>
      <ExtendedContentGrid>
        <ExtendedContentHalfLeft>
          <Info>
            <b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids
          </Info>
        </ExtendedContentHalfLeft>
        <ExtendedContentHalfRight>
          <Info>
            <b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids
          </Info>
        </ExtendedContentHalfRight>
      </ExtendedContentGrid>
      <MasonryGrid>
        <MasonryCustom1>
          <Info>
            <b>Custom (column desktop: 2-9)</b> for Image Grids
          </Info>
        </MasonryCustom1>
        <MasonryCustom2>
          <Info>
            <b>Custom (column desktop: 10-15)</b> for Image Grids
          </Info>
        </MasonryCustom2>
        <MasonryCustom3>
          <Info>
            <b>Custom (column desktop: 10-14)</b> for Image Grids
          </Info>
        </MasonryCustom3>
      </MasonryGrid>
      <TeaserGrid>
        <TeaserMedia>
          <Info style={{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }}>
            <b>Full</b> for Teaser Backgrounds and Media (Former Basic)
          </Info>
        </TeaserMedia>
        <TeaserContent>
          <Info>
            <b>Basic</b> for Content in Teaser
          </Info>
          <HeadingXLarge>Heading in Teaser</HeadingXLarge>
          <Text>Subline or Copy Text in Large Teaser</Text>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </TeaserContent>
      </TeaserGrid>
      <BasicContentGrid>
        <BasicContent>
          <Info>
            <b>Basic</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContent>
        <BasicContentHalfLeft>
          <Info>
            <b>Basic Half</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContentHalfLeft>
        <BasicContentHalfRight>
          <Info>
            <b>Basic Half</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContentHalfRight>
        <BasicContentOneThirdLeft>
          <Info>
            <b>Basic Third</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContentOneThirdLeft>
        <BasicContentOneThirdFollow>
          <Info>
            <b>Basic Third</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContentOneThirdFollow>
        <BasicContentOneThirdFollow>
          <Info>
            <b>Basic Third</b> for Content Tiles
          </Info>
          <Heading>Heading in Tile</Heading>
          <PButton style={{ marginTop: spacingFluidMedium }} variant="secondary">
            Some label
          </PButton>
        </BasicContentOneThirdFollow>
        <BasicContentTwoThirdsLeft>
          <Info>
            <b>Basic Two Thirds</b> for Content Tiles
          </Info>
        </BasicContentTwoThirdsLeft>
        <BasicContentOneThirdRight>
          <Info>
            <b>Basic One Third</b> for Content Tiles
          </Info>
        </BasicContentOneThirdRight>
        <BasicContentCustomLeft>
          <Info>
            <b>Custom (desktop: column 3-7)</b> for Content
          </Info>
        </BasicContentCustomLeft>
        <BasicContentCustomRight>
          <Info>
            <b>Custom (desktop: column 9-14)</b> for Content
          </Info>
        </BasicContentCustomRight>
      </BasicContentGrid>
      <NarrowContentGrid>
        <NarrowContent>
          <Info style={{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }}>
            <b>Narrow</b> for small Components and Content
          </Info>
          <PAccordion heading="Some Heading" tag="h3" open={isAccordion1Open} onUpdate={onAccordion1Update}>
            <Text>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
              felis, ultricies nec, pellentesque eu. Aenean massa.
            </Text>
          </PAccordion>
          <PAccordion heading="Some Heading" tag="h3" open={isAccordion2Open} onUpdate={onAccordion2Update}>
            <Text>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
              felis, ultricies nec, pellentesque eu. Aenean massa.
            </Text>
          </PAccordion>
        </NarrowContent>
        <NarrowContentHalfLeft>
          <Info>
            <b>Narrow</b> Half for small Content Tiles
          </Info>
          <Heading>Experience</Heading>
          <Text>
            Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
            to your wishes.
          </Text>
        </NarrowContentHalfLeft>
        <NarrowContentHalfRight>
          <Info>
            <b>Narrow</b> Half for small Content Tiles
          </Info>
          <Heading>Experience</Heading>
          <Text>
            Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
            to your wishes.
          </Text>
        </NarrowContentHalfRight>
      </NarrowContentGrid>
    </>
  );
};
