import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner-example',
  template: `
    <p-button type="button" (click)="onOpen()">Open Banner</p-button>
    <p-banner
      [open]="isBannerOpen"
      [heading]="'Some Heading'"
      [heading-tag]="'h3'"
      [description]="'Some Description'"
      (dismiss)="onDismiss()"
    >
    </p-banner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BannerExampleComponent {
  isBannerOpen = false;

  onOpen() {
    this.isBannerOpen = true;
  }
  onDismiss() {
    this.isBannerOpen = false;
  }
}
