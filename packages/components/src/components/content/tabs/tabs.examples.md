# Tabs

The `p-tabs` component makes it easy to explore and switch between different views. You can organize and allow navigation
between groups of content that are related and at the same level of hierarchy. The component handles the display of content
according to the active tab and all accessibility attributes on your tab and tab content.

This variant does not support `a` tags and should not be used for navigation. 
If you need to update your window location have a look at [Tabs Bar](components/tabs-bar) component.

<TableOfContents></TableOfContents>

## Basic example

Basic implementation shows a tab list with buttons to switch between the content. For every `p-tabs-item` inside of the `p-tabs` component, a tab
will be created. The assigned `label` property defines also the name of the button.

Every `p-tabs-item` holds a `slot` to display content which can be individually assigned. 

<Playground :markup="basic" :config="config"></Playground>

## Size

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
  </select>
</Playground>

## Weight

<Playground :markup="weightMarkup" :config="config">
  <select v-model="weight" aria-label="Select weight">
    <option disabled>Select weight</option>
    <option value="regular">Regular</option>
    <option value="semibold">SemiBold</option>
  </select>
</Playground>

## Gradient Color Scheme

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling.
The background and gradient has to align to your chosen background.

<Playground :markup="gradientMarkup" :config="{ ...config, colorScheme: gradientColorScheme }">
  <select v-model="gradientColorScheme" aria-label="Select color scheme">
    <option disabled>Select gradient-color-scheme</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Active Tab

You may need to change the initial active tab. To do so, set the `active-tab-index` attribute of `p-tabs`.
Make sure to update the `activeTabIndex` when adding or removing elements.

<Playground :markup="activeTab" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const buildTabsItem = (name: string, index: number) => 
`  <p-tabs-item label="Tab ${name}">
    <p-text>Tab Content ${name}</p-text>
  </p-tabs-item>`;
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  weight = 'semibold';
  size = 'medium';
  gradientColorScheme = 'surface';

  basic =
`<p-tabs>
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;

  get sizeMarkup() {
    return `<p-tabs size="${this.size}">
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;
  }

  get weightMarkup() {
    return `<p-tabs weight="${this.weight}">
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;
  }

  get gradientMarkup() {
    return `<p-tabs gradient-color-scheme="${this.gradientColorScheme}">
${['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
  .map(buildTabsItem).join('\n')}
</p-tabs>`;
  }
    
  activeTab =
`<p-tabs active-tab-index="1">
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;
}
</script>