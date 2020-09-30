# Tabs Nav

The `<p-tab-nav>` component is a styled link list for multiple purposes. You can use it with your framework router to ensure
your window location updates on tab click, use it for hash routing and displaying content accordingly to the hash or as skip navigation
to move on a longer page.

**Note**: Due to presentation purposes we use `<a>` tags without `href` in our examples. Keep in mind that you have to use them with `href`
in your application!

## Basic example

Basic implementation is a tab bar with tabs to switch between the content. Just put your `<a>` tags inside the `<p-tabs-nav>` 
component and it will handle all styling behaviors. 

<Playground>
  <template>
     <p-tabs-nav>
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
     </p-tabs-nav>
  </template>
</Playground>

## Switch size

You can choose between two button sizes, `small` or `medium`. It defaults to `small` and can be set by selecting the property on the `p-tabs-nav` component.

<Playground>
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option value="small">Small</option>
      <option selected value="medium">Medium</option>
    </select>
  </template>
  <template>
     <p-tabs-nav :size="size">
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
     </p-tabs-nav>
  </template>
</Playground>

## Scrollable Tab buttons

If the amount of `<a>` tags exceed the viewport, the tabs become horizontal scrollable.

<Playground>
  <template>
     <p-tabs-nav>
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
       <a>Tab Four</a>
       <a>Tab Five</a>
       <a>Tab Long Label Six</a>
       <a>Tab Seven</a>
       <a>Tab Eight</a>
       <a>Tab Nine</a>
     </p-tabs-nav>
  </template>
</Playground>

## Weight variants

The `<tabs-nav>` component comes with two text-weights `regular` or `semibold` where it defaults to `regular`.

<Playground>
  <template #configurator>
    <select v-model="weight">
      <option disabled>Select weight</option>
      <option selected value="regular">Regular</option>
      <option value="semibold">SemiBold</option>
    </select>
  </template>
  <template>
     <p-tabs-nav :weight="weight">
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
     </p-tabs-nav>
  </template>
</Playground>

## Theme variants

Choose between `light` and `dark` theme by using the `theme` property. Default theme is `light`.
The Theme changes the Background and text color of the tabs.

<Playground :themeable="true">
  <template v-slot="{theme}">
     <p-tabs-nav :theme="theme">
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
     </p-tabs-nav>
  </template>
</Playground>

## Gradient Color Scheme variants

If the amount of tabs exceed the viewport, the component renders arrow-buttons to help with horizontal scrolling.
The background and gradient has to align to your chosen background.

There are two different background types `default` and `surface`, you can choose between them by using the `gradient-color-scheme` property. It defaults to the value `default`.
The `gradient-color-scheme` has impact on `light` and `dark` theme.

<Playground :themeable="true">
<template #configurator>
    <select v-model="gradientColorScheme">
      <option disabled>Select gradient-color-scheme</option>
      <option selected value="default">Default</option>
      <option value="surface">Surface</option>
    </select>
  </template>
  <template v-slot="{theme}">
     <p-tabs-nav :theme="theme" :gradient-color-scheme="gradientColorScheme">
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
       <a>Tab Four</a>
       <a>Tab Five</a>
       <a>Tab Long Label Six</a>
       <a>Tab Seven</a>
       <a>Tab Eight</a>
       <a>Tab Nine</a>
     </p-tabs-nav>
  </template>
</Playground>

## Set active Tab

You may need to change the initial active tab. To do so, use the `active-tab-index` property on the `<p-tabs-nav>` component.
Keep in mind that the `active-tab-index` is counted like an array, so it starts with 0.

<Playground>
  <template>
     <p-tabs-nav active-tab-index="1">
       <a>Tab One</a>
       <a>Tab Two</a>
       <a>Tab Three</a>
     </p-tabs-nav>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundTabs extends Vue {
   public theme: string = 'light';
   public weight: string = 'regular';
   public size: string = 'medium';
   public gradientColorScheme: string = 'default';
  }
</script>