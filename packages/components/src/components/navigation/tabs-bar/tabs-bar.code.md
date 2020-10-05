# Tabs Bar

The Tabs Bar component is a styled button/link list for multiple purposes. You can use it with your framework router to ensure
your window location updates on tab click, use it for hash routing and displaying content accordingly to the hash, to change the state of a component
and therefore change the appearance of you content or as skip navigation to move on a longer page.

The Tabs Bar component does not handle the display of your content. If you use the component you have to manually care for the
content to be rendered beneath. To help with this task the Tabs ar component triggers a event called `tabClick` with the index
of the clicked tab as data.

If you intend to only change content on tab-click without location changes, we prepared a component which also
handles the correct display of content according to the clicked tab. Have a look at the [Tabs](#/components/tabs#code) component.

**Note**: We use `<button>` tags in the examples below because you have to use anchor tags with `href`
in your application! Therefore we avoid messing with the window location.

## Basic example

Basic implementation is a tab bar with tabs to switch between the content. Just put `<button>` if you need to change e.g. the state on tab-click  or `<a>`
tags, if you also have to manipulate the window location, inside the `<p-tabs-bar>` component and it will handle all styling behaviors. 

<Playground>
  <template>
     <p-tabs-bar>
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
  </template>
</Playground>

<Playground>
  <template>
     <p-tabs-bar>
       <a href="#">Tab One</a>
       <a href="#">Tab Two</a>
       <a href="#">Tab Three</a>
     </p-tabs-bar>
  </template>
</Playground>

## Accessibility

The `<p-tabs-bar` component is detached from the content which belongs to the active tab. We provide the necessary `role="tab"` and  `tab-index` on the tabs inside the component.
To be truly accessible every tab needs a `aria-controls` attribute with a uniq id. The top container of your content needs the `role="tabpanel"` and the attribute `aria-labelledby`
which gets the same uniq id as the according tab (`aria-controls`).

If you care about accessibility and think this is too much work, have a look at the [Tabs](#/components/tabs#code) where we handle everything for you.

<Playground>
  <template>
     <p-tabs-bar>
       <button aria-controls="tab-panel-1">Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
  </template>
  <div role="tabpanel" aria-labelledby="tab-panel-1">
    <p-text>Your content of Tab 1</p-text> 
  </div>
</Playground>

## Switch size

You can choose between two tab sizes, `small` or `medium`. It defaults to `small` and can be set by selecting the property on the `p-tabs-bar` component.

<Playground>
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option selected value="small">Small</option>
      <option value="medium">Medium</option>
    </select>
  </template>
  <template>
     <p-tabs-bar :size="size">
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
  </template>
</Playground>

## Scrollable Tab buttons

If the amount of tags exceed the viewport, the tabs become horizontal scrollable.

<Playground>
  <template>
     <p-tabs-bar>
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
       <button>Tab Four</button>
       <button>Tab Five</button>
       <button>Tab Long Label Six</button>
       <button>Tab Seven</button>
       <button>Tab Eight</button>
       <button>Tab Nine</button>
     </p-tabs-bar>
  </template>
</Playground>

## Weight variants

The `<tabs-bar>` component comes with two text-weights `regular` or `semibold` where it defaults to `regular`.

<Playground>
  <template #configurator>
    <select v-model="weight">
      <option disabled>Select weight</option>
      <option selected value="regular">Regular</option>
      <option value="semibold">SemiBold</option>
    </select>
  </template>
  <template>
     <p-tabs-bar :weight="weight">
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
  </template>
</Playground>

## Theme variants

Choose between `light` and `dark` theme by using the `theme` property. Default theme is `light`.
The Theme the text color of the tabs.

<Playground :themeable="true">
  <template v-slot="{theme}">
     <p-tabs-bar :theme="theme">
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
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
     <p-tabs-bar :theme="theme" :gradient-color-scheme="gradientColorScheme">
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
       <button>Tab Four</button>
       <button>Tab Five</button>
       <button>Tab Long Label Six</button>
       <button>Tab Seven</button>
       <button>Tab Eight</button>
       <button>Tab Nine</button>
     </p-tabs-bar>
  </template>
</Playground>

## Set active Tab

You may need to change the initial active tab. To do so, use the `active-tab-index` property on the `<p-tabs-bar>` component.
The componenent adds the class `data-selected` on the active tab.

**Note:** Keep in mind that the `active-tab-index` is counted like an array, so it starts with 0. 

<Playground>
  <template>
     <p-tabs-bar active-tab-index="1">
       <button>Tab One</button>
       <button>Tab Two</button>
       <button>Tab Three</button>
     </p-tabs-bar>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundTabs extends Vue {
   public theme: string = 'light';
   public weight: string = 'regular';
   public size: string = 'small';
   public gradientColorScheme: string = 'default';
  }
</script>