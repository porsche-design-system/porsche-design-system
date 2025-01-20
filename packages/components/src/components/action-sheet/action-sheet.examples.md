<ComponentHeading name="Action Sheet"></ComponentHeading>

The `p-action-sheet` is a temporary overlay to focus the user's attention on one or multiple tasks while the underlying
page is still visible but interactions with it are blocked. It should be used thoughtfully and sparingly.

It is a controlled component. This grants flexible control over the action-sheet's behavior especially whether it should
stay open after user interaction like submission of a form.

<TableOfContents></TableOfContents>

## Basic

Following **web standards**, the component uses the native `<dialog />` element internally which ensures proper focus
handling including a **focus trap**. In addition, it's rendered on the `#top-layer` which ensures the element to be on
top of the page independent of where `p-action-sheet` is placed in the DOM hierarchy (`z-index` is not relevant anymore
and won't have any effect).

The most important property of `p-action-sheet` is its `open` property. When it's set to `true` the action-sheet will be
visible. In order to get notified when the action-sheet gets closed by clicking the `x` button, the backdrop or by
pressing the `Escape` key you need to register an event listener for the `dismiss` event which is emitted by
`p-action-sheet`.

### Supported named slots:

- `slot="header"`: Renders a header section above the content area.
- `slot`: Shows the content area.

<Playground :frameworkMarkup="codeSamples" :markup="codeSamples['vanilla-js']" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

To provide a unique **accessible name** for the dialog, it's mandatory to ensure that a meaningful `aria-label` is set
on the `dialog` element **inside** the shadowDOM. This is either done automatically by the component itself if
`slot="header"` is used **or** by using the `aria` property on the `p-action-sheet` component.

## Dismiss Button

It's possible to render the action-sheet without dismiss button. At the same time this also deactivates dismissing the
action-sheet by pressing `Escape`.

<Playground :markup="dismissButtonMarkup" :config="config"></Playground>

## Disable Backdrop Click

It's possible to disable closing the action-sheet by click on the backdrop.

<Playground :markup="disableBackdropClickMarkup" :config="config"></Playground>

## Example: Modal with Porsche Grid

The `p-action-sheet` component makes decent changes to the Porsche Grid to give support if used as slotted content. The
following example shows the visualization of the Porsche Grid when used inside the action-sheet component:

<template>
  <div class="playground">
    <div class="demo">
      <p-button type="button" aria="{ 'aria-haspopup': 'dialog' }" :theme="this.$store.getters.storefrontTheme">Open Action Sheet</p-button>
      <p-action-sheet open="false">
        <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
        <ExampleStylesGrid :visualizeGrid="true"/>
        <p-button-group slot="footer">
          <p-button>Accept</p-button>
          <p-button type="button" variant="secondary">Deny</p-button>
        </p-button-group>
      </p-action-sheet>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getActionSheetCodeSamples } from '@porsche-design-system/shared';
import ExampleStylesGrid from '@/pages/patterns/styles/example-grid.vue';

@Component({
  components: {
    ExampleStylesGrid
  },
})
export default class Code extends Vue {
  config = { themeable: true };
  actionSheets = [];
  codeSamples = getActionSheetCodeSamples();

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.actionSheets = this.$el.querySelectorAll('.playground .demo > p-action-sheet');
    this.actionSheets.forEach((actionSheet, index) => actionSheet.addEventListener('dismiss', () => this.dismissActionSheet(index)));
    this.$el.querySelectorAll('.playground .demo > p-button').forEach((btn, index) => btn.addEventListener('click', () => this.openActionSheet(index)));
  }

  openActionSheet(index: number): void {
    this.actionSheets[index].open = true;
  }

  dismissActionSheet(index: number): void {
    this.actionSheets[index].open = false;
  }

  dismissButtonMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Action Sheet</p-button>
<p-action-sheet dismiss-button="false" open="false" aria="{ 'aria-label': 'Some Label' }">
  <p-text>Some Content</p-text>
</p-action-sheet>`;

  disableBackdropClickMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Action Sheet</p-button>
<p-action-sheet disable-backdrop-click="true" open="false" aria="{ 'aria-label': 'Some Label' }">
  <p-text>Some Content</p-text>
</p-action-sheet>`;
}
</script>
