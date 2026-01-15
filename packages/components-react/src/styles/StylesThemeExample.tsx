import styled from '@emotion/styled';
import {
  borderRadiusSmall,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundShading,
  themeDarkBackgroundSurface,
  themeDarkContrastHigh,
  themeDarkContrastLow,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationErrorSoft,
  themeDarkNotificationInfo,
  themeDarkNotificationInfoSoft,
  themeDarkNotificationSuccess,
  themeDarkNotificationSuccessSoft,
  themeDarkNotificationWarning,
  themeDarkNotificationWarningSoft,
  themeDarkPrimary,
  themeDarkStateActive,
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundShading,
  themeLightBackgroundSurface,
  themeLightContrastHigh,
  themeLightContrastLow,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationErrorSoft,
  themeLightNotificationInfo,
  themeLightNotificationInfoSoft,
  themeLightNotificationSuccess,
  themeLightNotificationSuccessSoft,
  themeLightNotificationWarning,
  themeLightNotificationWarningSoft,
  themeLightPrimary,
  themeLightStateActive,
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
} as const;

const WrapperLight = styled.div({
  ...wrapperStyle,
  background: themeLightBackgroundBase,
});

const WrapperDark = styled.div({
  ...wrapperStyle,
  background: themeDarkBackgroundBase,
});

// Typography
const headingStyle = {
  ...headingMediumStyle,
  textAlign: 'center',
  width: '100%',
  margin: 0,
} as const;

const HeadingLight = styled.h3({
  ...headingStyle,
  color: themeLightPrimary,
});

const HeadingDark = styled.h3({
  ...headingStyle,
  color: themeDarkPrimary,
});

// Tile
const getTileStyle = {
  borderRadius: borderRadiusSmall,
  padding: spacingFluidMedium,
  border: '1px solid grey',
} as const;

// Theme Light
const ThemeLightPrimary = styled.div({
  ...getTileStyle,
  background: themeLightPrimary,
});

const ThemeLightBackgroundBase = styled.div({
  ...getTileStyle,
  background: themeLightBackgroundBase,
});

const ThemeLightBackgroundSurface = styled.div({
  ...getTileStyle,
  background: themeLightBackgroundSurface,
});

const ThemeLightBackgroundShading = styled.div({
  ...getTileStyle,
  background: themeLightBackgroundShading,
});

const ThemeLightBackgroundFrosted = styled.div({
  ...getTileStyle,
  background: themeLightBackgroundFrosted,
});

const ThemeLightContrastLow = styled.div({
  ...getTileStyle,
  background: themeLightContrastLow,
});

const ThemeLightContrastMedium = styled.div({
  ...getTileStyle,
  background: themeLightContrastMedium,
});

const ThemeLightContrastHigh = styled.div({
  ...getTileStyle,
  background: themeLightContrastHigh,
});

const ThemeLightNotificationSuccess = styled.div({
  ...getTileStyle,
  background: themeLightNotificationSuccess,
});

const ThemeLightNotificationSuccessSoft = styled.div({
  ...getTileStyle,
  background: themeLightNotificationSuccessSoft,
});

const ThemeLightNotificationWarning = styled.div({
  ...getTileStyle,
  background: themeLightNotificationWarning,
});

const ThemeLightNotificationWarningSoft = styled.div({
  ...getTileStyle,
  background: themeLightNotificationWarningSoft,
});

const ThemeLightNotificationError = styled.div({
  ...getTileStyle,
  background: themeLightNotificationError,
});

const ThemeLightNotificationErrorSoft = styled.div({
  ...getTileStyle,
  background: themeLightNotificationErrorSoft,
});

const ThemeLightNotificationInfo = styled.div({
  ...getTileStyle,
  background: themeLightNotificationInfo,
});

const ThemeLightNotificationInfoSoft = styled.div({
  ...getTileStyle,
  background: themeLightNotificationInfoSoft,
});

const ThemeLightStateHover = styled.div({
  ...getTileStyle,
  background: themeLightStateHover,
});

const ThemeLightStateActive = styled.div({
  ...getTileStyle,
  background: themeLightStateActive,
});

const ThemeLightStateFocus = styled.div({
  ...getTileStyle,
  background: themeLightStateFocus,
});

const ThemeLightStateDisabled = styled.div({
  ...getTileStyle,
  background: themeLightStateDisabled,
});

// Theme Dark
const ThemeDarkPrimary = styled.div({
  ...getTileStyle,
  background: themeDarkPrimary,
});

const ThemeDarkBackgroundBase = styled.div({
  ...getTileStyle,
  background: themeDarkBackgroundBase,
});

const ThemeDarkBackgroundSurface = styled.div({
  ...getTileStyle,
  background: themeDarkBackgroundSurface,
});

const ThemeDarkBackgroundShading = styled.div({
  ...getTileStyle,
  background: themeDarkBackgroundShading,
});

const ThemeDarkBackgroundFrosted = styled.div({
  ...getTileStyle,
  background: themeDarkBackgroundFrosted,
});

const ThemeDarkContrastLow = styled.div({
  ...getTileStyle,
  background: themeDarkContrastLow,
});

const ThemeDarkContrastMedium = styled.div({
  ...getTileStyle,
  background: themeDarkContrastMedium,
});

const ThemeDarkContrastHigh = styled.div({
  ...getTileStyle,
  background: themeDarkContrastHigh,
});

const ThemeDarkNotificationSuccess = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationSuccess,
});

const ThemeDarkNotificationSuccessSoft = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationSuccessSoft,
});

const ThemeDarkNotificationWarning = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationWarning,
});

const ThemeDarkNotificationWarningSoft = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationWarningSoft,
});

const ThemeDarkNotificationError = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationError,
});

const ThemeDarkNotificationErrorSoft = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationErrorSoft,
});

const ThemeDarkNotificationInfo = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationInfo,
});

const ThemeDarkNotificationInfoSoft = styled.div({
  ...getTileStyle,
  background: themeDarkNotificationInfoSoft,
});

const ThemeDarkStateHover = styled.div({
  ...getTileStyle,
  background: themeDarkStateHover,
});

const ThemeDarkStateActive = styled.div({
  ...getTileStyle,
  background: themeDarkStateActive,
});

const ThemeDarkStateFocus = styled.div({
  ...getTileStyle,
  background: themeDarkStateFocus,
});

const ThemeDarkStateDisabled = styled.div({
  ...getTileStyle,
  background: themeDarkStateDisabled,
});

export const StylesThemeExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <HeadingLight>Theme Light</HeadingLight>
        <ThemeLightPrimary />
        <ThemeLightBackgroundBase />
        <ThemeLightBackgroundSurface />
        <ThemeLightBackgroundShading />
        <ThemeLightBackgroundFrosted />
        <ThemeLightContrastLow />
        <ThemeLightContrastMedium />
        <ThemeLightContrastHigh />
        <ThemeLightNotificationSuccess />
        <ThemeLightNotificationSuccessSoft />
        <ThemeLightNotificationWarning />
        <ThemeLightNotificationWarningSoft />
        <ThemeLightNotificationError />
        <ThemeLightNotificationErrorSoft />
        <ThemeLightNotificationInfo />
        <ThemeLightNotificationInfoSoft />
        <ThemeLightStateHover />
        <ThemeLightStateActive />
        <ThemeLightStateFocus />
        <ThemeLightStateDisabled />
      </WrapperLight>
      <WrapperDark>
        <HeadingDark>Theme Dark</HeadingDark>
        <ThemeDarkPrimary />
        <ThemeDarkBackgroundBase />
        <ThemeDarkBackgroundSurface />
        <ThemeDarkBackgroundShading />
        <ThemeDarkBackgroundFrosted />
        <ThemeDarkContrastLow />
        <ThemeDarkContrastMedium />
        <ThemeDarkContrastHigh />
        <ThemeDarkNotificationSuccess />
        <ThemeDarkNotificationSuccessSoft />
        <ThemeDarkNotificationWarning />
        <ThemeDarkNotificationWarningSoft />
        <ThemeDarkNotificationError />
        <ThemeDarkNotificationErrorSoft />
        <ThemeDarkNotificationInfo />
        <ThemeDarkNotificationInfoSoft />
        <ThemeDarkStateHover />
        <ThemeDarkStateActive />
        <ThemeDarkStateFocus />
        <ThemeDarkStateDisabled />
      </WrapperDark>
    </>
  );
};
