<template>
  <div class="light flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md bg-background-base-light">
    <h3 class="pds-heading-md text-center w-full m-0">Theme Light</h3>
    <div class="bg-primary rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-base rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-surface rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-shading rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-frosted rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-low rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-medium rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-high rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-success rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-success-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-warning rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-warning-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-error rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-error-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-info rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-info-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-hover rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-active rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-focus rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-disabled rounded-sm p-fluid-md border-thin border-gray-500" />
  </div>
  <div class="dark flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md bg-background-base-dark">
    <h3 class="pds-heading-md text-center w-full m-0">Theme Dark</h3>
    <div class="bg-primary rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-base rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-surface rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-shading rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-background-frosted rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-low rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-medium rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-high rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-success rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-success-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-warning rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-warning-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-error rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-error-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-info rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-notification-info-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-hover rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-active rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-focus rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-state-disabled rounded-sm p-fluid-md border-thin border-gray-500" />
  </div>
</template>

// Tile
export const getTileStyle = {
borderRadius: borderRadiusSmall,
padding: spacingFluidMedium,
border: '1px solid grey',
} as const;

// Theme Light
export const ThemeLightPrimary = style({
...getTileStyle,
background: themeLightPrimary,
});
<script setup lang="ts">
</script>