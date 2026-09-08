import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type FlyoutDismissEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout</p-button>
    <p-text>Last dismissed via: {{ dismissReason ?? 'not dismissed yet' }}</p-text>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="onDismiss($event)" [aria]="{ 'aria-label': 'Some Heading' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
      <p-button slot="footer" type="button">Proceed</p-button>
      <p-button slot="footer" type="button" [variant]="'secondary'">Cancel</p-button>
      <p-text slot="sub-footer">Some additional Sub-Footer</p-text>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class FlyoutExampleComponent {
  isFlyoutOpen = false;
  dismissReason?: FlyoutDismissEventDetail['reason'];

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss(e: CustomEvent<FlyoutDismissEventDetail>) {
    this.dismissReason = e.detail.reason;
    this.isFlyoutOpen = false;
  }
}
