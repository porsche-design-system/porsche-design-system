import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-flyout-navigation-example-basic',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout Navigation</p-button>
    <p-flyout-navigation [open]="isFlyoutNavigationOpen" (dismiss)="onDismiss()">
      <p-flyout-navigation-item identifier="item-1" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-2" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-3" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-4" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-5" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-6" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
    </p-flyout-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutNavigationExampleBasicComponent {
  isFlyoutNavigationOpen = false;

  onOpen() {
    this.isFlyoutNavigationOpen = true;
  }
  onDismiss() {
    this.isFlyoutNavigationOpen = false;
  }
}
