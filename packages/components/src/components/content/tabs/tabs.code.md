# Tabs

The Tabs component makes it easy to explore and switch between different views. You can organize and allow navigation
between groups of content that are related and at the same level of hierarchy. The Tabs component handles the display of content
according to the active tab and all accessibility attributes on your tab and tab content.

This variant does not support `a` tags and should not be used for navigation. 
If you need to update your window location have a look at our [Tabs Bar](#/components/tabs-bar#code) component.

---

## Basic example

Basic implementation shows a tab list with buttons to switch between the content. For every `p-tabs-item` inside of the `p-tabs` component, a tab
will be created. The assigned `label` property defines also the name of the Button.

Every `p-tabs-item` holds a `slot` to display content which can be individually assigned. 

<Playground>
  <template>
    <p-tabs>
      <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Switch size

You can choose between two tab sizes, `small` or `medium`. It defaults to `small` and can be set by selecting the property on the `p-tabs` component.

<Playground>
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option selected value="small">Small</option>
      <option value="medium">Medium</option>
    </select>
  </template>
  <template>
    <p-tabs :size="size">
      <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Scrollable Tab buttons

If the amount of `p-tabs-item` exceed the viewport, the buttons become horizontal scrollable.

<Playground>
  <template>
    <p-tabs>
      <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
      <p-tabs-item label="Item Four">Tab Content Four</p-tabs-item>
      <p-tabs-item label="Item Five">Tab Content Five</p-tabs-item>
      <p-tabs-item label="Long Label Six">Tab Content Long Label Six</p-tabs-item>
      <p-tabs-item label="Item Seven">Tab Content Seven</p-tabs-item>
      <p-tabs-item label="Item Eight">Tab Content Eight</p-tabs-item>
      <p-tabs-item label="Item Nine">Tab Content Nine</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Weight variants

The tabs component comes with two text-weights `regular` or `semibold` where it defaults to `regular`.

<Playground>
  <template #configurator>
    <select v-model="weight">
      <option disabled>Select weight</option>
      <option selected value="regular">Regular</option>
      <option value="semibold">SemiBold</option>
    </select>
  </template>
  <template>
    <p-tabs :weight="weight">
      <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Theme variants

Choose between `light` and `dark` theme by using the `theme` property. Default theme is `light`.
The Theme changes the Background of the tabs.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-tabs :theme="theme">
      <p-tabs-item label="Item One" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Three</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Gradient Color Scheme variants

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling.
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
    <p-tabs :theme="theme" :gradient-color-scheme="gradientColorScheme">
      <p-tabs-item label="Item One" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content One</p-tabs-item>
      <p-tabs-item label="Item Two" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Two</p-tabs-item>
      <p-tabs-item label="Item Three" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Three</p-tabs-item>
      <p-tabs-item label="Item Four" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Four</p-tabs-item>
      <p-tabs-item label="Item Five" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Five</p-tabs-item>
      <p-tabs-item label="Long Label Six" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Long Label Six</p-tabs-item>
      <p-tabs-item label="Item Seven" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Seven</p-tabs-item>
      <p-tabs-item label="Item Eight" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Eight</p-tabs-item>
      <p-tabs-item label="Item Nine" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Nine</p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Set active Tab

You may need to change the initial active tab. To do so, use the `selected` property on the `p-tabs-item` you want to select on first render. 
If you put the property on multiple `p-tabs-item` it will select the first .

<Playground>
  <template>
     <p-tabs>
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two" selected>Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
     </p-tabs>
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