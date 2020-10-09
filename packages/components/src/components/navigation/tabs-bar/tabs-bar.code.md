# Tabs Bar

The component is a styled button/link list for multiple purposes. You can use it with your framework router to ensure
your window location updates on tab click, use it for hash routing and displaying content accordingly to the hash, to change the state of another element
and therefore change the appearance of your content or as skip navigation to move on a longer page.

The component does not handle the display of your content. If you use the component you have to manually care for the
content to be rendered beneath. To help with this task the component triggers an event called `tabChange` with the index
of the active tab.

If you intend to only change content on tab-click without location changes and you are fine that the content needs to be pre-rendered then we prepared a component which also
handles the correct display of content according to the active tab. Have a look at the [Tabs](#/components/tabs#code) component.

**Note**: We use `<button>` tags in the examples below because you have to use anchor tags with `href`
in your application! Therefore, we avoid messing with the window location.

---

## Basic example

Basic implementation is a tab bar with tabs to switch between the content. Just put `<button>` tags if you need to change e.g. the state on tab-click or `<a>`
tags, if you also have to manipulate the window location, inside the `<p-tabs-bar>` component and it will handle all styling behaviors. 

<Playground :themeable="true">
  <template>
    <p-tabs-bar>
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
  </template>
</Playground>

<Playground :themeable="true">
  <template>
    <p-tabs-bar>
      <a href="#">Tab One</a>
      <a href="#">Tab Two</a>
      <a href="#">Tab Three</a>
    </p-tabs-bar>
  </template>
</Playground>

## Accessibility

The `<p-tabs-bar` component is detached from the content which belongs to the active tab. We provide the necessary `role="tab"`, `tab-index` and `aria-selected` on the tabs inside the component.

To be truly accessible you need to provide some more information because every tab needs an `aria-controls` attribute with a unique id. The content placeholder needs the `role="tabpanel"` and the attribute `aria-labelledby`
which gets the same unique id as the according tab (`aria-controls`).

```html
<p-tabs-bar>
  <button type="button" aria-controls="tab-panel-1">Tab One</button>
  <button type="button" aria-controls="tab-panel-2">Tab Two</button>
  <button type="button" aria-controls="tab-panel-3">Tab Three</button>
</p-tabs-bar>

<div role="tabpanel" aria-labelledby="tab-panel-1">
  <p-text>Your content of Tab 1</p-text> 
</div>
<div role="tabpanel" aria-labelledby="tab-panel-2">
  <p-text>Your content of Tab 2</p-text>
</div>
<div role="tabpanel" aria-labelledby="tab-panel-3">
  <p-text>Your content of Tab 3</p-text>
</div>
```

---

## Size

<Playground :themeable="true">
  <template #configurator>
    <select v-model="size">
      <option disabled>Select size</option>
      <option selected value="small">Small</option>
      <option value="medium">Medium</option>
    </select>
  </template>
  <template>
    <p-tabs-bar :size="size">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
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
  <template>
    <p-tabs-bar :weight="weight">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
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
    <p-tabs-bar :theme="theme" :gradient-color-scheme="gradientColorScheme">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
      <button type="button">Tab Four</button>
      <button type="button">Tab Five</button>
      <button type="button">Tab Six</button>
      <button type="button">Tab Seven</button>
      <button type="button">Tab Eight</button>
      <button type="button">Tab Nine</button>
      <button type="button">Tab Ten</button>
      <button type="button">Tab Eleven</button>
      <button type="button">Tab Twelve</button>
      <button type="button">Tab Thirteen</button>
      <button type="button">Tab Fourteen</button>
      <button type="button">Tab Fifteen</button>
      <button type="button">Tab Sixteen</button>
      <button type="button">Tab Seventeen</button>
      <button type="button">Tab Eighteen</button>
      <button type="button">Tab Nineteen</button>
      <button type="button">Tab Twenty</button>
    </p-tabs-bar>
  </template>
</Playground>

## Active Tab

**Note:** Keep in mind that the property `active-tab-index` uses zero-based numbering. 

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-tabs-bar :theme="theme" active-tab-index="1">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
    </p-tabs-bar>
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
    
    public mounted(): void {
      this.$refs["some-tabs-bar"].addEventListener('tabChange', (e) => {
        this.activeTabIndex = e.detail.activeTabIndex;
      });
    }
  }
</script>