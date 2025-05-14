<template>
  <div class="light flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md bg-base-light">
    <h3 class="prose-heading-md text-center w-full m-0">Theme Light</h3>
    <div class="bg-primary rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-base rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-surface rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-shading rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-frosted rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-low rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-medium rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-high rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-success rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-success-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-warning rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-warning-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-error rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-error-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-info rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-info-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-hover rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-active rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-focus rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-disabled rounded-sm p-fluid-md border-thin border-gray-500" />
  </div>
  <div class="dark flex flex-wrap items-start justify-center gap-fluid-md p-fluid-md bg-base-dark">
    <h3 class="prose-heading-md text-center w-full m-0">Theme Dark</h3>
    <div class="bg-primary rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-base rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-surface rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-shading rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-frosted rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-low rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-medium rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-contrast-high rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-success rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-success-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-warning rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-warning-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-error rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-error-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-info rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-info-soft rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-hover rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-active rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-focus rounded-sm p-fluid-md border-thin border-gray-500" />
    <div class="bg-disabled rounded-sm p-fluid-md border-thin border-gray-500" />
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