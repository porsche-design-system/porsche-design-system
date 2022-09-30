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

In order to get notified when the active tabs change, you need to register an event listener for the `tabChange` event
which is emitted by `p-tabs-bar`.

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
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="{ base: 'small', l: 'medium' }">Responsive</option>
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

If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. The
background and gradient has to align to your chosen background.

<Playground :markup="gradientMarkup" :config="{ ...config, colorScheme: gradientColorScheme }">
  <select v-model="gradientColorScheme" aria-label="Select color scheme">
    <option disabled>Select gradient-color-scheme</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getTabsBarCodeSamples } from '@porsche-design-system/shared';

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

  weight = 'semibold';
  size = 'medium';
  gradientColorScheme = 'surface';

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

  get sizeMarkup() {
    return `<p-tabs-bar size="${this.size}">
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;
  }

  get weightMarkup() {
    return `<p-tabs-bar weight="${this.weight}">
${['One', 'Two', 'Three'].map(buildButton).join('\n')}
</p-tabs-bar>`;
  }
    
  get gradientMarkup() {
    return `<p-tabs-bar gradient-color-scheme="${this.gradientColorScheme}">
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
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('tabChange', () => {
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
    tabsBars.forEach(tabsBar => tabsBar.addEventListener('tabChange', this.onTabChange));

    /* bind tabsBars with activeTabIndex set as attribute */
    const tabsBarsWithActiveIndex = this.$el.querySelectorAll('.playground-tabs-bar .example .demo p-tabs-bar');
    tabsBarsWithActiveIndex.forEach(tabsBar => tabsBar.addEventListener('tabChange', (e: CustomEvent<TabChangeEvent>)=> {
      this.onTabChange(e);
      this.updateActiveTabIndex(e.target, e.detail.activeTabIndex);
    }));
  }

  onTabChange = (e: CustomEvent) => {
    e.target.activeTabIndex = e.detail.activeTabIndex;
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  :deep(div[role=tabpanel]) {
    outline: 1px solid transparent;
    outline-offset: 2px;
    margin-top: p-px-to-rem(8px);
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
