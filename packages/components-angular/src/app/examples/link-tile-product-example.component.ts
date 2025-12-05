import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkTileProductLikeEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-product-example',
  template: `
    <p-link-tile-product
      [heading]="'Some product name'"
      [price]="'1.911,00 €'"
      [description]="'Some description'"
      [href]="'https://porsche.com'"
      [liked]="liked"
      (like)="handleLike($event)"
    >
      <p-tag slot="header" [variant]="'secondary'">New</p-tag>
      <img src="http://localhost:3002/placeholder_800x900.svg" width="800" height="900" alt="Some alt text" />
    </p-link-tile-product>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class LinkTileProductExampleComponent {
  liked = false;
  handleLike(e: CustomEvent<LinkTileProductLikeEventDetail>) {
    this.liked = !e.detail.liked;
  }
}
