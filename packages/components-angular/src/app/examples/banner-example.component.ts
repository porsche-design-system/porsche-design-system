import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

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
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
