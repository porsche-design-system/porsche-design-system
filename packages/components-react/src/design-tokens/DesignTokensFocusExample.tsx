import React from 'react';
import styled from 'styled-components';
import {
  getFocusStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
  themeLightBackgroundBase,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const getWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
} as const;

const WrapperLight = styled.div({
  ...getWrapperStyle,
  background: themeLightBackgroundBase,
});

const WrapperDark = styled.div({
  ...getWrapperStyle,
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

// Focus Light
const NativeButtonLight = styled.button({
  ...textSmallStyle,
  ...getFocusStyle({ offset: 'medium' }),
  color: themeLightPrimary,
});

const NativeAnchorLight = styled.a({
  ...textSmallStyle,
  ...getFocusStyle({ offset: 'small' }),
  color: themeLightPrimary,
});

// Focus Dark
const NativeButtonDark = styled.button({
  ...textSmallStyle,
  ...getFocusStyle({ offset: 'medium', theme: 'dark' }),
  color: themeLightPrimary,
});

const NativeAnchorDark = styled.a({
  ...textSmallStyle,
  ...getFocusStyle({ offset: 'small', theme: 'dark' }),
  color: themeDarkPrimary,
});

export const DesignTokensFocusExample = (): JSX.Element => {
  return (
    <>
      <WrapperLight>
        <HeadingLight>Focus Light (only visible by keyboard navigation)</HeadingLight>
        <NativeButtonLight>Some Button</NativeButtonLight>
        <NativeAnchorLight href="#">Some Anchor</NativeAnchorLight>
      </WrapperLight>
      <WrapperDark>
        <HeadingDark>Focus Dark (only visible by keyboard navigation)</HeadingDark>
        <NativeButtonDark>Some Button</NativeButtonDark>
        <NativeAnchorDark href="#">Some Anchor</NativeAnchorDark>
      </WrapperDark>
    </>
  );
};
