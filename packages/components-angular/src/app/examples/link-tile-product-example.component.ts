import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { LinkTileProductLikeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-product-example',
  template: `
    <p-link-tile-product
      [heading]="'Some product name'"
      [price]="'1.911,00 €'"
      [description]="'Some info'"
      [href]="'https://www.porsche.com'"
      [liked]="liked"
      (like)="handleLike($event)"
    >
      <p-tag slot="header" [color]="'background-base'">New</p-tag>
      <img src="./assets/placeholder_800x900" width="800" height="900" alt="Some alt text" />
    </p-link-tile-product>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileProductExampleComponent {
  liked = false;
  handleLike(e: CustomEvent<LinkTileProductLikeEvent>) {
    this.liked = !e.detail.liked;
  }
}
