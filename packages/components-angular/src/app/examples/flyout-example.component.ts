import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-flyout-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout</p-button>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'Some Heading' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
      <p-button-group slot="footer">
        <p-button type="button">Proceed</p-button>
        <p-button type="button" [variant]="'secondary'">Cancel</p-button>
      </p-button-group>
      <p-text slot="sub-footer">Some additional Sub-Footer</p-text>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FlyoutExampleComponent {
  isFlyoutOpen = false;

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss() {
    this.isFlyoutOpen = false;
  }
}
