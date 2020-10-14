# Banner
The **Banner** component are used to provide action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. 
Whenever you want to provide brief, temporary notifications stick to the **Toast component** (work in progress) instead. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

## Basic implementation
The **Banner** component is positioned absolute above the page content by default. For personal adjustments, go to "Custom styling" section.

<Playground :themeable="true">
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a state</option>
      <option value="neutral">Neutral</option>
      <option value="warning">Warning</option>
      <option value="error">Error</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-banner :state="state" :theme="theme">
      <span slot="title">Some banner title</span>
      <span slot="description">Some banner description. You can also add inline <a href="#">links</a> to route to another page.</span>
    </p-banner>
  </template>
</Playground>

## Persistent
If the **Banner** shouldn't be removable by the user, add `persistent` prop.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-banner persistent="true" :theme="theme">
      <span slot="title">Some banner title</span>
      <span slot="description">Some banner description.</span>
    </p-banner>
  </template>
</Playground>

## Width
The **Banner** behaves the same as the **ContentWrapper** component and can be adapted to the same widths to match with your layout.

<Playground :themeable="true">
  <template #configurator>
    <select v-model="width">
      <option disabled>Select a width</option>
      <option value="basic">Basic</option>
      <option value="extended">Extended</option>
      <option value="fluid">Fluid</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-banner :width="width" :theme="theme">
      <span slot="title">Some banner title</span>
      <span slot="description">Some banner description.</span>
    </p-banner>
  </template>
</Playground>

## Example with user interaction
<Playground>
  <p-button v-on:click="openBanner">Open Banner</p-button>
</Playground>

## Custom styling
The **Banner** component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables):

``` 
// default CSS variables
--p-banner-position-type: fixed;
--p-banner-position-top: p-px-to-rem(56px);
--p-banner-position-bottom: p-px-to-rem(56px);

// overwrite with CSS variables
p-banner {
  --p-banner-position-top: 200px;
}

``` 


<style lang="scss">
  .code p-banner {
    --p-banner-position-type: static;
  }
</style>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundBanner extends Vue {
    public state: string = 'neutral';
    public width: string = 'basic';
    
    openBanner = () => {
      const el = document.createElement('div');
      el.innerHTML = `
      <p-banner>
        <span slot="title">Some banner title</span>
        <span slot="description">Some banner description.</span>
      </p-banner>
      `;
      document.getElementById('app').append(el);
    };
  
    mounted(): void {
      const banners = document.querySelectorAll('p-banner');
      banners.forEach((el) => el.addEventListener("dismiss", () => console.log("dismissed")));
    }
  }
</script>
