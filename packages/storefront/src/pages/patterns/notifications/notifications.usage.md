# Notifications

Notifications are an important method of communicating with users and providing feedback.

Their main aim should be to help users perform a task and not necessarily interfere or get in the way of users while
using your product. Ensure your **notifications are relevant, timely, and informative.**

**Keep in Mind:** Highly frequented or disruptive Notifications can have a **negative impact** on the user's experience.

<TableOfContents></TableOfContents>

## When to use

In order to find the right notification type for your use case, we have defined some decision-making rules for you:

<p-link :theme="this.$store.getters.storefrontTheme" href="patterns/notifications/decision-tree" variant="primary">Go to
the Decision Tree</p-link>

---

## Types/Behavior

| Components                            | Placement            | Follow-up Action | Hide               | Criticality | States                           |
| ------------------------------------- | -------------------- | ---------------- | ------------------ | ----------- | -------------------------------- |
| **Form elements (Inline Validation)** | Below form element   | Yes              | Resolved           | Low         | Success, Error                   |
| **Toast**                             | Bottom, Left         | No               | Automatically (6s) | Low/Medium  | Neutral, Success                 |
| **Inline Notification**               | Before/After Content | Yes              | Resolved/Dismiss   | Medium      | Neutral, Success, Warning, Error |
| **Banner**                            | Top, Center          | Yes              | Resolved/Dismiss   | Medium/High | Neutral, Warning, Error          |
| **Modal**                             | Center               | Yes              | Resolved/Dismiss   | High        | Neutral, Warning, Error          |

## z-index in descending order

**Important: In the future, all elements will be rendered on the browsers top-layer so a manual ordering of z-index will
not work anymore. As we are progressing with the refactoring this might already be the case for some components.**

| Component                                                                                                                         | z-index                         |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Toast                                                                                                                             | {{zIndexes.toast}} / top-layer  |
| Modal                                                                                                                             | {{zIndexes.modal}} / top-layer  |
| Flyout                                                                                                                            | {{zIndexes.flyout}} / top-layer |
| Popover <p-popover :theme="this.$store.getters.storefrontTheme" ref="popover">Start the live demo to see it in action</p-popover> | {{zIndexes.popover}}            |
| Banner                                                                                                                            | {{zIndexes.banner}} / top-layer |

<p-button :theme="this.$store.getters.storefrontTheme" v-on:click="startDemo()">Start Live Demo</p-button>

<!-- shared across playgrounds -->

<p-toast :theme="this.$store.getters.storefrontTheme" ref="toast"></p-toast>

<div>  
  <p-modal :theme="this.$store.getters.storefrontTheme" ref="modal" heading="Some Heading" :open="isModalOpen">
    <p-text :theme="this.$store.getters.storefrontTheme">Some Content</p-text>
  </p-modal>
</div>

<div>  
  <p-flyout :theme="this.$store.getters.storefrontTheme" ref="flyout" :open="isFlyoutOpen">
    <p-text :theme="this.$store.getters.storefrontTheme">Some Content</p-text>
  </p-flyout>
</div>

## References

- Kim Flaherty,
  [Indicators, Validations, and Notifications](https://nngroup.com/articles/indicators-validations-notifications)s
  (Nielsen Norman Group, 2015)
- Aurora Harley, [Visibility of System Status](https://nngroup.com/articles/visibility-system-status) (Nielsen Norman
  Group, 2018)
- Jakob Nielsen,
  [10 Usability Heuristics for User Interface Design](https://nngroup.com/articles/ten-usability-heuristics) (Nielsen
  Norman Group, 1994)
- [Web Content Accessibility Guidelines](https://w3.org/WAI/standards-guidelines/wcag)

<script lang="ts">import Vue from 'vue';
import Component from 'vue-class-component';
import {
  BANNER_Z_INDEX,
  FLYOUT_Z_INDEX,
  MODAL_Z_INDEX, 
  POPOVER_Z_INDEX,
  TOAST_Z_INDEX
} from '@porsche-design-system/components/src/constants';

@Component
export default class Code extends Vue {
  isModalOpen = false;
  isFlyoutOpen = false;
  isBannerOpen = false;
  toastCounter = 1;

  zIndexes = {
    toast: TOAST_Z_INDEX,
    modal: MODAL_Z_INDEX,
    flyout: FLYOUT_Z_INDEX,
    popover: POPOVER_Z_INDEX,
    banner: BANNER_Z_INDEX,
  };

  mounted() {
    this.$refs.modal.addEventListener('dismiss', () => this.isModalOpen = false);
    this.$refs.flyout.addEventListener('dismiss', () => this.isFlyoutOpen = false);
  }

  startDemo() {
    this.$refs.popover.shadowRoot.querySelector('button').click();
    this.$refs.toast.addMessage({ text: `Some message ${this.toastCounter}`});
    this.toastCounter++;
    this.isModalOpen = true;
    this.isFlyoutOpen = true; 
    if(!this.isBannerOpen){    
      this.openBanner();
    }
  };

  openBanner() {
    const el = document.createElement('p-banner'); 
    el.innerHTML = `
      <span slot="title">Some banner title</span>
      <span slot="description">Some banner description.</span>
    `;
    document.getElementById('app').append(el);

    this.isBannerOpen = true;
    el.theme = this.$store.getters.storefrontTheme;
    el.open = true;

    el.addEventListener('dismiss', () => {
      this.isBannerOpen = false;
      el.open = false;
    });
  };
}
</script>
