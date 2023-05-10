# Flyout

## Basic

<Playground :markup="positionMarkup">
  <SelectOptions v-model="position" :values="positions" name="position"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  flyouts = [];

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyouts = document.querySelectorAll('p-flyout');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.flyouts.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
    });
  }

  position = 'right';
  positions = ['left', 'right'];
  get positionMarkup() {
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
            <p-flyout open="false">
              <div slot="header">
                <p-heading tag="h5" size="large">Sticky Heading</p-heading>
                <p-text size="small">Sticky header text</p-text>
              </div>
              <div slot="footer">
                <p-button>Footer Button</p-button>
              </div>
            </p-flyout>`;}

  openFlyout(index: number): void {
    this.flyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyouts[index].open = false;
  }
}
</script>
