# Tabs

The Tabs component makes it easy to explore and switch between different views. You can organize and allow navigation
between groups of content that are related and at the same level of hierarchy.

## Basic example

Basic implementation is a `left-aligned` tab bar with buttons to switch between the content. For every `p-tabs-item` inside of the `p-tabs` component, a button
will be created. The assigned `label` property defines also the name of the Button.

Every `p-tabs-item` holds a `slot` to display content which can be individually designed. 

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

You can choose between two button sizes, `small` or `medium`. It defaults to `medium` and an be set by selecting the property on the `p-tabs` component.

<Playground>
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option value="small">Small</option>
      <option selected value="medium">Medium</option>
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

## Navigation Tabs

By default tabs use a button element, but if you define the `href` property on `p-tabs-item` it is changed to an `a` tag where you can also define the property `target`.
It is possible to have buttons and anchor-tags simultaneously. 

<Playground>
  <template>
     <p-tabs>
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three" href="https://porsche.com" target="_blank"></p-tabs-item>
     </p-tabs>
  </template>
</Playground>

## Alignment variants

Use the property `align` to choose between three alignments `left` | `center` | `right`. Default alignment is `left`.

<Playground>
  <template #configurator>
    <select v-model="alignment">
      <option disabled>Select alignment mode</option>
      <option selected value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
    </select>
  </template>
  <template>
     <p-tabs :align="alignment">
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
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
The Theme changes the Background of the buttons and content-container.

<Playground :themeable="true">
  <template v-slot="{theme}">
     <p-tabs :theme="theme">
       <p-tabs-item label="Item One" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three" v-bind:style="[theme === 'dark' ? {color: 'white'} : {color: 'black'}]">Tab Content Three</p-tabs-item>
     </p-tabs>
  </template>
</Playground>

## Set active Tab

You may need to change the initial active tab. To do so you got two options. You can use the property `active-tab` on the `tabs` component to define the
selected tab. Keep in mind the tabs are a array and therefore start with 0. You´re unable to set `active-tab` greater than the amount of `p-tabs-item` or less than `0`.
It will automatically select the last or first `p-tabs-item`.

The second approach is to use the `selected` property on the `p-tabs-item` you want to select on first render.

<Playground>
  <template>
     <p-tabs active-tab="1">
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
     </p-tabs>
  </template>
</Playground>

<Playground>
  <template>
     <p-tabs>
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two" selected>Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
     </p-tabs>
  </template>
</Playground>

## Disable Tab

If you need to disable a tab you can use the `disabled` property on the `p-tabs-item` you want to disable. This should be avoided if possible.

<Playground>
  <template>
     <p-tabs>
       <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
       <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
       <p-tabs-item label="Item Three" disabled>Tab Content Three</p-tabs-item>
     </p-tabs>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundTabs extends Vue {
   public alignment: string = 'left';
   public theme: string = 'light';
   public weight: string = 'regular';
   public size: string = 'medium';
  }
</script>