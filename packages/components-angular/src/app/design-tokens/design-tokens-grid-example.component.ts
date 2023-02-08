import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { AccordionChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-design-tokens-grid-example',
  styleUrls: ['./design-tokens-grid-example.component.scss'],
  template: `
    <div class="visualize-grid">
      <span *ngFor="let n of counter(16)" class="visualize-grid-columns"></span>
    </div>
    <div class="hero-grid">
      <div class="hero-media">
        <span class="info"><b>Full</b> for Background and Media</span>
      </div>
      <div class="hero-header">
        <h1 class="display">Hero Heading</h1>
        <p class="text-large">Subline for the Hero Header in Extended Grid</p>
      </div>
    </div>
    <div class="extended-content-grid">
      <div class="extended-content-half-left">
        <span class="info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
      <div class="extended-content-half-right">
        <span class="info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
    </div>
    <div class="masonry-grid">
      <div class="masonry-custom-1">
        <span class="info"><b>Custom (column desktop: 2-9)</b> for Image Grids</span>
      </div>
      <div class="masonry-custom-2">
        <span class="info"><b>Custom (column desktop: 10-15)</b> for Image Grids</span>
      </div>
      <div class="masonry-custom-3">
        <span class="info"><b>Custom (column desktop: 10-14)</b> for Image Grids</span>
      </div>
    </div>
    <div class="teaser-grid">
      <div class="teaser-media">
        <span class="info"><b>Full</b> for Teaser Backgrounds and Media (Former Basic)</span>
      </div>
      <div class="teaser-content">
        <span class="info"><b>Basic</b> for Content in Teaser</span>
        <h2 class="heading-x-large">Heading in Teaser</h2>
        <p class="text">Subline or Copy Text in Large Teaser</p>
        <p-button variant="secondary">Some label</p-button>
      </div>
    </div>
    <div class="basic-content-grid">
      <div class="basic-content">
        <span class="info"><b>Basic</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-half-left">
        <span class="info"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-half-right">
        <span class="info"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-left">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-follow">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-follow">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-two-thirds-left">
        <span class="info kbBcQV"><b>Basic Two Thirds</b> for Content Tiles</span>
      </div>
      <div class="basic-content-one-third-right">
        <span class="info"><b>Basic One Third</b> for Content Tiles</span>
      </div>
      <div class="basic-content-custom-left">
        <span class="info"><b>Custom (desktop: column 3-7)</b> for Content</span>
      </div>
      <div class="basic-content-custom-right">
        <span class="info"><b>Custom (desktop: column 9-14)</b> for Content</span>
      </div>
    </div>
    <div class="narrow-content-grid">
      <div class="narrow-content">
        <span class="info"><b>Narrow</b> for small Components and Content</span
        ><p-accordion
          heading="Some Heading"
          tag="h3"
          [open]="isAccordion1Open"
          (accordionChange)="onAccordion1Change($event)"
          ><p class="text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
            felis, ultricies nec, pellentesque eu. Aenean massa.
          </p></p-accordion
        ><p-accordion
          heading="Some Heading"
          tag="h3"
          [open]="isAccordion2Open"
          (accordionChange)="onAccordion2Change($event)"
          ><p class="text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
            felis, ultricies nec, pellentesque eu. Aenean massa.
          </p></p-accordion
        >
      </div>
      <div class="narrow-content-half-left">
        <span class="info"><b>Narrow</b> Half for small Content Tiles</span>
        <h3 class="heading">Experience</h3>
        <p class="text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according to
          your wishes.
        </p>
      </div>
      <div class="narrow-content-half-right">
        <span class="info"><b>Narrow</b> Half for small Content Tiles</span>
        <h3 class="heading">Experience</h3>
        <p class="text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according to
          your wishes.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensGridExampleComponent {
  counter(i: number) {
    return new Array(i);
  }

  isAccordion1Open = false;
  isAccordion2Open = false;

  onAccordion1Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion1Open = e.detail.open;
  }
  onAccordion2Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion2Open = e.detail.open;
  }
}
