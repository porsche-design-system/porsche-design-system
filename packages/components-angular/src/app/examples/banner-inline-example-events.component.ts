import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner-inline-example-events',
  template: `
    <p-button (click)="onShow()">Show BannerInline</p-button>
    <p-banner-inline
      *ngIf="isActive"
      [heading]="'Some banner-inline heading'"
      [description]="'Some banner-inline description.'"
      (dismiss)="onDismiss()"
    ></p-banner-inline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerInlineExampleEventsComponent {
  isActive = false;

  onShow() {
    this.isActive = true;
  }
  onDismiss() {
    this.isActive = false;
  }
}
