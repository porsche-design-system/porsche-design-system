# Tabs Bar

The `p-tabs-bar` component is a styled button/link list for multiple purposes. You can use it with your framework router
to ensure your window location updates on tab click, use it for hash routing and displaying content accordingly to the
hash, to change the state of another element and therefore change the appearance of your content or as skip navigation
to move on a longer page.

The component does not handle the display of your content. If you use the component you have to manually care for the
content to be rendered beneath. To help with this task the component triggers an event called `tabChange` with the index
of the active tab.

If you intend to only change content on tab-click without location changes and you are fine that the content needs to be
pre-rendered then we prepared a component which also handles the correct display of content according to the active tab.
Have a look at the [Tabs](components/tabs) component.

**Note**: We use `<button>` tags in the examples below because you have to use anchor tags with `href` in your
application! Therefore, we avoid messing with the window location.

It is a controlled component. This means it does not contain any internal state, and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic example

Basic implementation is a tab bar with tabs to switch between the content. Just put `<button>` tags if you need to
change e.g. the state on tab-click or `<a>` tags, if you also have to manipulate the window location, inside the
`<p-tabs-bar>` component and it will handle all styling behaviors.

In order to get notified when the active tabs change, you need to register an event listener for the `change` event
which is emitted by `p-tabs-bar`.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The <code>tabChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</p-inline-notification>

### Framework Implementations

<Playground :frameworkMarkup="codeExampleBasic" :markup="basicButton"></Playground>

### Buttons

<Playground :markup="basicButton" :config="config"></Playground>

### Links

<Playground :markup="basicAnchor" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

The `p-tabs-bar` component is detached from the content which belongs to the active tab. We provide the necessary
`role="tab"`, `tabindex` and `aria-selected` on the tabs inside the component.

To be truly accessible you need to provide some more information because every tab needs an `aria-controls` attribute
which points to the corresponding `id` of the `tabpanel`. The content placeholder needs the `role="tabpanel"` and the
attribute `aria-labelledby` which points to the unique id of the corresponding tab (`aria-controls`).

You must also take care of the focus handling of the tabpanel. Therefor the active tab panel must have an `tabindex="0"`
to receive keyboard focus and the focus indicator must be styled accordingly.

<Playground class="playground-tabs-bar" :frameworkMarkup="codeExampleAccessibility" :markup="accessibility" :config="config"></Playground>

---

## Active Tab

**Note:** Keep in mind that the property `active-tab-index` uses zero-based numbering. Setting `active-tab-index` to
`undefined` removes the selection. Make sure to update the `activeTabIndex` when adding or removing elements.

<Playground class="playground-tabs-bar" :markup="activeTab" :config="config"></Playground>

## Size

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>

## Weight

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The <code>semibold</code> value has been deprecated and will be removed with the next major release.<br>
  Please use the <code>semi-bold</code> value instead.
</p-inline-notification>

<Playground :markup="weightMarkup" :config="config">
  <SelectOptions v-model="weight" :values="weights" name="weight"></SelectOptions>
</Playground>

## Gradient color

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. The
background and gradient has to align to your chosen background.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The <code>gradientColorScheme</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>gradientColor</code> property instead.
</p-inline-notification>

<Playground :markup="gradientColorMarkup" :config="{ ...config, backgroundColor: gradientColor }">
  <SelectOptions v-model="gradientColor" :values="gradientColors" name="gradientColor"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getTabsBarCodeSamples } from '@porsche-design-system/shared';
import { TABS_BAR_SIZES, TABS_BAR_WEIGHTS, TABS_BAR_WEIGHTS_DEPRECATED } from './tabs-bar-utils';
import { GRADIENT_COLORS } from '../scroller/scroller-utils'; 

const buildButton = (name: string) => `  <button type="button">Tab ${name}</button>`;
const buildAnchor = (name: string) => `  <a href="https://porsche.com" target="_blank">Tab ${name}</a>`;
const buildTabPanel = (id: number) => `<div id="tab-panel-${id}" hidden tabindex="-1" role="tabpanel" aria-labelledby="tab-item-${id}">
  <p-text>Your content of Tab ${id}</p-text> 
</div>`;
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  codeExampleAccessibility = getTabsBarCodeSamples('example-accessibility');
  codeExampleBasic = getTabsBarCodeSamples('example-basic');

  basicButton =
    `<p-tabs-bar>
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;

  basicAnchor =
    `<p-tabs-bar>
${['One', 'Two', 'Three'].map(buildAnchor).join('\n')}
</p-tabs-bar>`;

  accessibility = 
    `<p-tabs-bar active-tab-index="0">
  <button type="button" id="tab-item-1" aria-controls="tab-panel-1">Tab One</button>
  <button type="button" id="tab-item-2" aria-controls="tab-panel-2">Tab Two</button>
  <button type="button" id="tab-item-3" aria-controls="tab-panel-3">Tab Three</button>
</p-tabs-bar>
 
    ${[1, 2, 3].map(buildTabPanel).join('\n')}`;

  size = 'medium';
  sizes = [...TABS_BAR_SIZES, "{ base: 'small', l: 'medium' }"];
  get sizeMarkup() {
    return `<p-tabs-bar size="${this.size}">
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;
  }

  weight = 'semi-bold';
  weights = TABS_BAR_WEIGHTS.map(item => TABS_BAR_WEIGHTS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get weightMarkup() {
    return `<p-tabs-bar weight="${this.weight}">
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;
  }

  gradientColor = 'background-surface';
  gradientColors = GRADIENT_COLORS;
  get gradientColorMarkup() {
    return `<p-tabs-bar gradient-color="${this.gradientColor}">
${['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'].map(buildButton).join('\n')}
</p-tabs-bar>`;
  }
    
  activeTab =
    `<p-tabs-bar active-tab-index="0">
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;

  updateActiveTabIndex(tabsBar: HTMLElement, newIndex: number = 0) {
    /* manipulate code only in order to not rerender component and loose animations */
    const example = tabsBar.parentElement.parentElement;
    const demo = example.querySelector('.demo');
    const code = example.querySelector('code');

    /* manipulate hidden attribute in code of accessibility playground */
    const panels = Array.from(demo.querySelectorAll('[role="tabpanel"]'));
    panels.forEach((panel, i) => {
      if (i === newIndex) {
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '0');
      } else {
        panel.setAttribute('hidden', '');
        panel.setAttribute('tabindex', '-1');
      }
    });
  };

  mounted() {
    /* initially update tabsBars with activeTabIndex in playground */
    this.updateAndRegister();
    
    /* theme switch needs to register event listeners again */
    const themeTabsBar = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabsBar.forEach(tab => tab.addEventListener('update', () => {
      this.updateAndRegister(); 
    }));    
  }

  updated() {
    this.registerEvents();
  }

  updateAndRegister() {
    this.updateActiveTabIndex(this.$el.querySelector('.playground-tabs-bar .example p-tabs-bar'));      
    this.registerEvents();
  }

  registerEvents() {
    const tabsBars = this.$el.querySelectorAll('.playground:not(.playground-tabs-bar) .example .demo p-tabs-bar');
    tabsBars.forEach(tabsBar => tabsBar.addEventListener('update', this.onTabsBarUpdate));

    /* bind tabsBars with activeTabIndex set as attribute */
    const tabsBarsWithActiveIndex = this.$el.querySelectorAll('.playground-tabs-bar .example .demo p-tabs-bar');
    tabsBarsWithActiveIndex.forEach(tabsBar => tabsBar.addEventListener('update', (e: CustomEvent<TabsBarUpdateEvent>)=> {
      this.onTabsBarUpdate(e);
      this.updateActiveTabIndex(e.target, e.detail.activeTabIndex);
    }));
  }

  onTabsBarUpdate = (e: CustomEvent<TabsBarUpdateEvent>) => {
    e.target.activeTabIndex = e.detail.activeTabIndex;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(div[role=tabpanel]) {
    outline: 1px solid transparent;
    outline-offset: 2px;
    margin-top: $pds-spacing-static-small;
  }

  :deep(.example--light div[role=tabpanel]:focus) {
    outline-color: #000;
  }

  :deep(.example--dark div[role=tabpanel]:focus) {
    outline-color: #FFF;
  }

  :deep(div[role=tabpanel]:focus:not(:focus-visible)) {
    outline-color: transparent;
  }
</style>
