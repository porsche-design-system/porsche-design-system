import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type LinkTileProductLikeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-link-tile-product [liked]="liked" heading="Some product" price="718,00 €" priceOriginal="911,00 €" description="Some description" href="https://porsche.com" (like)="onLike($event)">
        <a slot="anchor" href="https://porsche.com">
          Weekender, sale price 718,00 €, original price 
          <s>
            911,00 €
          </s>
        </a>
        <img src="assets/placeholder_800x900.svg" [width]="800" [height]="900" alt="Some alt text" />
      </p-link-tile-product>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  liked = false;

  onLike(e: CustomEvent<LinkTileProductLikeEvent>) {
    this.liked = !e.detail.liked;
  }
}
