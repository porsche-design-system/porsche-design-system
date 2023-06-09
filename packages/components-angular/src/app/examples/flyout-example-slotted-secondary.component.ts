import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-flyout-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout</p-button>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'Sticky Heading' }">
      <div slot="header">
        <p-heading tag="h5" size="large">Sticky Heading</p-heading>
        <p-text size="small">Sticky header text</p-text>
      </div>
      <p-text style="width: 50vw; height: 100vh">Some Content</p-text>
      <div slot="footer">
        <p-button>Footer Button</p-button>
      </div>
      <p-text slot="sub-footer">Some Sub Footer Content</p-text>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutExampleSlottedSecondaryComponent {
  isFlyoutOpen = false;

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss() {
    this.isFlyoutOpen = false;
  }
}
