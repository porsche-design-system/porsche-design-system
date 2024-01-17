import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { LinkTileProductLikeEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-product-example',
  template: `
    <p-link-tile-product
      [heading]="'Some product name'"
      [price]="'1.911,00 €'"
      [description]="'Some description'"
      [href]="'https://www.porsche.com'"
      [liked]="liked"
      (like)="handleLike($event)"
    >
      <p-tag slot="header" [color]="'background-base'">New</p-tag>
      <img
        src="https://porsche-design-system.github.io/porsche-design-system/placeholder_800x900.svg"
        width="800"
        height="900"
        alt="Some alt text"
      />
    </p-link-tile-product>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileProductExampleComponent {
  liked = false;
  handleLike(e: CustomEvent<LinkTileProductLikeEventDetail>) {
    this.liked = !e.detail.liked;
  }
}
