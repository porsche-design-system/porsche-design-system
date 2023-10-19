<ComponentHeading name="Tabs"></ComponentHeading>

The `p-tabs` component makes it easy to explore and switch between different views. You can organize and allow
navigation between groups of content that are related and at the same level of hierarchy. The component handles the
display of content according to the active tab and all accessibility attributes on your tab and tab content.

This variant does not support `a` tags and should not be used for navigation. If you need to update your window location
have a look at [Tabs Bar](components/tabs-bar) component.

<TableOfContents></TableOfContents>

<Notification heading="Deprecation hint" state="warning">
  The <code>tabChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

## Basic example

Basic implementation shows a tab list with buttons to switch between the content. For every `p-tabs-item` inside of the
`p-tabs` component, a tab will be created. The assigned `label` property defines also the name of the button.

Every `p-tabs-item` holds a `slot` to display content which can be individually assigned.

<Playground :markup="basic" :config="config"></Playground>

## Size

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>

## Weight

<Notification heading="Deprecation hint" state="warning">
  The <code>semibold</code> value has been deprecated and will be removed with the next major release.<br>
  Please use the <code>semi-bold</code> value instead.
</Notification>

<Playground :markup="weightMarkup" :config="config">
  <SelectOptions v-model="weight" :values="weights" name="weight"></SelectOptions>
</Playground>

## Gradient color

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. The
background and gradient has to align to your chosen background.

<Notification heading="Deprecation hint" state="warning">
  The <code>gradientColorScheme</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>gradientColor</code> property instead.
</Notification>

<Playground :markup="gradientColorMarkup" :config="{ ...config, backgroundColor: gradientColor }">
  <SelectOptions v-model="gradientColor" :values="gradientColors" name="gradientColor"></SelectOptions>
</Playground>

## Active Tab

You may need to change the initial active tab. To do so, set the `active-tab-index` attribute of `p-tabs`. Make sure to
update the `activeTabIndex` when adding or removing elements.

<Playground :markup="activeTab" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TABS_BAR_SIZES, TABS_BAR_WEIGHTS, TABS_BAR_WEIGHTS_DEPRECATED } from '../tabs-bar/tabs-bar-utils';
import { GRADIENT_COLORS } from '../scroller/scroller-utils'; 

const buildTabsItem = (name: string, index: number) => 
`  <p-tabs-item label="Tab ${name}">
    <p-text>Tab Content ${name}</p-text>
  </p-tabs-item>`;
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  basic =
`<p-tabs>
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;

  size = 'medium';
  sizes = [...TABS_BAR_SIZES, "{ base: 'small', l: 'medium' }"];
  get sizeMarkup() {
    return `<p-tabs size="${this.size}">
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;
  }

  weight = 'semi-bold';
  weights = TABS_BAR_WEIGHTS.map(item => TABS_BAR_WEIGHTS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);;
  get weightMarkup() {
    return `<p-tabs weight="${this.weight}">
${['One', 'Two', 'Three'].map(buildTabsItem).join('\n')}
</p-tabs>`;
  }

  gradientColor = 'background-surface';
  gradientColors = GRADIENT_COLORS;
  get gradientColorMarkup() {
    return `<p-tabs gradient-color="${this.gradientColor}">
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
