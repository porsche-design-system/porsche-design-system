import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { LinkTileProductUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-product-example',
  template: `
    <p-link-tile-product
      [heading]="'Some product name'"
      [price]="'199,99€'"
      [info]="'Some info'"
      [href]="'/'"
      [liked]="liked"
      (likeChange)="handleLikeChange($event)"
    >
      <p-tag slot="tags" [color]="'background-base'">New</p-tag>
      <img src="/assets/link-tile-product-example-01.webp" alt="Some alt text" />
    </p-link-tile-product>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileProductExampleComponent {
  liked = false;
  handleLikeChange(e: CustomEvent<LinkTileProductUpdateEvent>) {
    this.liked = !e.detail.liked;
  }
}
