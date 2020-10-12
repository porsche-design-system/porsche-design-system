# Tabs

The component makes it easy to explore and switch between different views. You can organize and allow navigation
between groups of content that are related and at the same level of hierarchy. The component handles the display of content
according to the active tab and all accessibility attributes on your tab and tab content.

This variant does not support `a` tags and should not be used for navigation. 

In case you want the user to navigate to another page, you should select the [Tabs Bar](#/components/tabs-bar) component instead.

---

## Basic example

Basic implementation shows a tab list with buttons to switch between the content. For every `p-tabs-item` inside of the `p-tabs` component, a tab
will be created. The assigned `label` property defines also the name of the button.

Every `p-tabs-item` holds a `slot` to display content which can be individually assigned. 

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-tabs :theme="theme">
      <p-tabs-item label="Tab One">
        <p-text :theme="theme">Tab Content One</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Two" selected>
        <p-text :theme="theme">Tab Content Two</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Three">
        <p-text :theme="theme">Tab Content Three</p-text>
      </p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Size

<Playground :themeable="true">
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option selected value="small">Small</option>
      <option value="medium">Medium</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-tabs :theme="theme" :size="size">
      <p-tabs-item label="Tab One">
        <p-text :theme="theme">Tab Content One</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Two" selected>
        <p-text :theme="theme">Tab Content Two</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Three">
        <p-text :theme="theme">Tab Content Three</p-text>
      </p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Weight

<Playground :themeable="true">
  <template #configurator>
    <select v-model="weight">
      <option disabled>Select weight</option>
      <option selected value="regular">Regular</option>
      <option value="semibold">SemiBold</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-tabs :theme="theme" :weight="weight">
      <p-tabs-item label="Tab One">
        <p-text :theme="theme">Tab Content One</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Two" selected>
        <p-text :theme="theme">Tab Content Two</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Three">
        <p-text :theme="theme">Tab Content Three</p-text>
      </p-tabs-item>
   </p-tabs>
  </template>
</Playground>

## Gradient Color Scheme

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling.
The background and gradient has to align to your chosen background.

<Playground :themeable="true" :color-scheme="gradientColorScheme">
  <template #configurator>
    <select v-model="gradientColorScheme">
      <option disabled>Select gradient-color-scheme</option>
      <option selected value="default">Default</option>
      <option value="surface">Surface</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-tabs :theme="theme" :gradient-color-scheme="gradientColorScheme">
      <p-tabs-item label="Tab One">
        <p-text :theme="theme">Tab Content One</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Two">
        <p-text :theme="theme">Tab Content Two</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Three">
        <p-text :theme="theme">Tab Content Three</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Four">
        <p-text :theme="theme">Tab Content Four</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Five">
        <p-text :theme="theme">Tab Content Five</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Six">
        <p-text :theme="theme">Tab Content Six</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Seven">
        <p-text :theme="theme">Tab Content Seven</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Eight">
        <p-text :theme="theme">Tab Content Eight</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Nine">
        <p-text :theme="theme">Tab Content Nine</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Ten">
        <p-text :theme="theme">Tab Content Ten</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Eleven">
        <p-text :theme="theme">Tab Content Eleven</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Twelve">
        <p-text :theme="theme">Tab Content Twelve</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Thirteen">
        <p-text :theme="theme">Tab Content Thirteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Fourteen">
        <p-text :theme="theme">Tab Content Fourteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Fifteen">
        <p-text :theme="theme">Tab Content Fifteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Sixteen">
        <p-text :theme="theme">Tab Content Sixteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Seventeen">
        <p-text :theme="theme">Tab Content Seventeen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Eighteen">
        <p-text :theme="theme">Tab Content Eighteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Nineteen">
        <p-text :theme="theme">Tab Content Nineteen</p-text>
      </p-tabs-item>
      <p-tabs-item label="Tab Twenty">
        <p-text :theme="theme">Tab Content Twenty</p-text>
      </p-tabs-item>
    </p-tabs>
  </template>
</Playground>

## Active Tab

You may need to change the initial active tab. To do so, use the `selected` property on the `p-tabs-item` you want to select on first render. 
If you put the property on multiple `p-tabs-item` it will select the first .

<Playground :themeable="true">
  <template v-slot="{theme}">
     <p-tabs :theme="theme">
       <p-tabs-item label="Tab One">
        <p-text :theme="theme">Tab Content One</p-text>
       </p-tabs-item>
       <p-tabs-item label="Tab Two" selected>
        <p-text :theme="theme">Tab Content Two</p-text>
       </p-tabs-item>
       <p-tabs-item label="Tab Three">
        <p-text :theme="theme">Tab Content Three</p-text>
       </p-tabs-item>
     </p-tabs>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundTabs extends Vue {
    public theme: string = 'light';
    public weight: string = 'semibold';
    public size: string = 'medium';
    public gradientColorScheme: string = 'surface';
    public activeTabIndex: number = 0;
  }
</script>