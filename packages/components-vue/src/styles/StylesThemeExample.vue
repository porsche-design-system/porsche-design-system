<script setup lang="ts">
import {
  HeadingDark,
  HeadingLight,
  ThemeDarkBackgroundBase,
  ThemeDarkBackgroundFrosted,
  ThemeDarkBackgroundShading,
  ThemeDarkBackgroundSurface,
  ThemeDarkContrastHigh,
  ThemeDarkContrastLow,
  ThemeDarkContrastMedium,
  ThemeDarkNotificationError,
  ThemeDarkNotificationErrorSoft,
  ThemeDarkNotificationInfo,
  ThemeDarkNotificationInfoSoft,
  ThemeDarkNotificationSuccess,
  ThemeDarkNotificationSuccessSoft,
  ThemeDarkNotificationWarning,
  ThemeDarkNotificationWarningSoft,
  ThemeDarkPrimary,
  ThemeDarkStateActive,
  ThemeDarkStateDisabled,
  ThemeDarkStateFocus,
  ThemeDarkStateHover,
  ThemeLightBackgroundBase,
  ThemeLightBackgroundFrosted,
  ThemeLightBackgroundShading,
  ThemeLightBackgroundSurface,
  ThemeLightContrastHigh,
  ThemeLightContrastLow,
  ThemeLightContrastMedium,
  ThemeLightNotificationError,
  ThemeLightNotificationErrorSoft,
  ThemeLightNotificationInfo,
  ThemeLightNotificationInfoSoft,
  ThemeLightNotificationSuccess,
  ThemeLightNotificationSuccessSoft,
  ThemeLightNotificationWarning,
  ThemeLightNotificationWarningSoft,
  ThemeLightPrimary,
  ThemeLightStateActive,
  ThemeLightStateDisabled,
  ThemeLightStateFocus,
  ThemeLightStateHover,
  WrapperDark,
  WrapperLight,
} from './theme.css';
</script>

<template>
  <div :class="WrapperLight">
    <h3 :class="HeadingLight">Theme Light</h3>
    <div :class="ThemeLightPrimary" />
    <div :class="ThemeLightBackgroundBase" />
    <div :class="ThemeLightBackgroundSurface" />
    <div :class="ThemeLightBackgroundShading" />
    <div :class="ThemeLightBackgroundFrosted" />
    <div :class="ThemeLightContrastLow" />
    <div :class="ThemeLightContrastMedium" />
    <div :class="ThemeLightContrastHigh" />
    <div :class="ThemeLightNotificationSuccess" />
    <div :class="ThemeLightNotificationSuccessSoft" />
    <div :class="ThemeLightNotificationWarning" />
    <div :class="ThemeLightNotificationWarningSoft" />
    <div :class="ThemeLightNotificationError" />
    <div :class="ThemeLightNotificationErrorSoft" />
    <div :class="ThemeLightNotificationInfo" />
    <div :class="ThemeLightNotificationInfoSoft" />
    <div :class="ThemeLightStateHover" />
    <div :class="ThemeLightStateActive" />
    <div :class="ThemeLightStateFocus" />
    <div :class="ThemeLightStateDisabled" />
  </div>
  <div :class="WrapperDark">
    <h3 :class="HeadingDark">Theme Dark</h3>
    <div :class="ThemeDarkPrimary" />
    <div :class="ThemeDarkBackgroundBase" />
    <div :class="ThemeDarkBackgroundSurface" />
    <div :class="ThemeDarkBackgroundShading" />
    <div :class="ThemeDarkBackgroundFrosted" />
    <div :class="ThemeDarkContrastLow" />
    <div :class="ThemeDarkContrastMedium" />
    <div :class="ThemeDarkContrastHigh" />
    <div :class="ThemeDarkNotificationSuccess" />
    <div :class="ThemeDarkNotificationSuccessSoft" />
    <div :class="ThemeDarkNotificationWarning" />
    <div :class="ThemeDarkNotificationWarningSoft" />
    <div :class="ThemeDarkNotificationError" />
    <div :class="ThemeDarkNotificationErrorSoft" />
    <div :class="ThemeDarkNotificationInfo" />
    <div :class="ThemeDarkNotificationInfoSoft" />
    <div :class="ThemeDarkStateHover" />
    <div :class="ThemeDarkStateActive" />
    <div :class="ThemeDarkStateFocus" />
    <div :class="ThemeDarkStateDisabled" />
  </div>
</template>


