# Flyout Navigation

<Notification heading="Experimental Component" state="warning">
  Interface of Flyout Navigation might change in the near future.
</Notification>

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basicExample" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 

@Component()
export default class Code extends Vue {
  config = { themeable: true };
  flyouts = [];
  
  blindtext = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyouts = document.querySelectorAll('.playground .demo p-flyout-navigation');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.flyouts.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
    });
  }

basicExample =
`<p-button>Open Flyout Navigation</p-button>
<p-flyout-navigation>
  <div slot="level-1">
    <p-button-pure stretch="true" align-label="start">Women</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Men</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Kids</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Accessories</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Model Cars</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Porsche Originals</p-button-pure>
    <p-button-pure stretch="true" align-label="start">Porsche Design</p-button-pure>
  </div>
  <div slot="level-2">
    <p-heading size="small">Apparel</p-heading>
    <p-link-pure href="#" stretch="true" icon="none">Jacket</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Polo & Shirts</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Sweaters</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">T-Shirt</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">View all</p-link-pure>
    <p-heading size="small">Accessories</p-heading>
    <p-link-pure href="#" stretch="true" icon="none">Caps</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Belts</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Beanies, Scarves & Gloves</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Timepieces</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">View all</p-link-pure>
    <p-heading size="small">Collection</p-heading>
    <p-link-pure href="#" stretch="true" icon="none">Transformers</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">MARTINI RACING</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Dakar</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Penske Motorsport</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Porsche x FIN</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Essential</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">Motorsport</p-link-pure>
    <p-link-pure href="#" stretch="true" icon="none">View all</p-link-pure>
  </div>
</p-flyout-navigation>`;
    
  openFlyout(index: number): void {
    this.flyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyouts[index].open = false;
  }
}
</script>
