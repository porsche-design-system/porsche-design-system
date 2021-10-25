import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner-inline-example-action-button',
  template: `
    <p-banner-inline
      [heading]="'Some banner-inline heading'"
      [description]="'Some banner-inline description.'"
      [actionLabel]="'Retry'"
      [actionIcon]="'reset'"
      [actionLoading]="isLoading"
      (action)="onAction()"
    ></p-banner-inline>
    <p-button (click)="onAction()">Reset</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerInlineExampleActionButtonComponent {
  isLoading = false;

  onAction() {
    this.isLoading = !this.isLoading;
  }
}
