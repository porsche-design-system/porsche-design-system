import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type FlyoutNavigationUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-navigation-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout Navigation</p-button>
    <p-flyout-navigation
      [open]="isFlyoutNavigationOpen"
      [activeIdentifier]="flyoutNavigationActiveIdentifier"
      (dismiss)="onDismiss()"
      (update)="onUpdate($event)"
    >
      <p-flyout-navigation-item identifier="item-1" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-2" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-3" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-4" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
      <p-flyout-navigation-item identifier="item-5" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-navigation-item>
    </p-flyout-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutNavigationExampleComponent {
  isFlyoutNavigationOpen = false;
  flyoutNavigationActiveIdentifier: string | undefined = undefined;

  onOpen(): void {
    this.isFlyoutNavigationOpen = true;
  }
  onDismiss(): void {
    this.isFlyoutNavigationOpen = false;
  }
  onUpdate(e: CustomEvent<FlyoutNavigationUpdateEventDetail>): void {
    this.flyoutNavigationActiveIdentifier = e.detail.activeIdentifier;
  }
}
