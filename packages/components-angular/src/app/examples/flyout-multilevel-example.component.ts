import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type FlyoutMultilevelUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-multilevel-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout Multilevel</p-button>
    <p-flyout-multilevel
      [open]="isFlyoutMultilevelOpen"
      [activeIdentifier]="flyoutMultilevelActiveIdentifier"
      (dismiss)="onDismiss()"
      (update)="onUpdate($event)"
    >
      <p-flyout-multilevel-item identifier="item-1" label="Some Label">
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
      </p-flyout-multilevel-item>
      <p-flyout-multilevel-item identifier="item-2" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-multilevel-item>
      <p-flyout-multilevel-item identifier="item-3" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-multilevel-item>
      <p-flyout-multilevel-item identifier="item-4" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-multilevel-item>
      <p-flyout-multilevel-item identifier="item-5" label="Some Label">
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-multilevel-item>
    </p-flyout-multilevel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutMultilevelExampleComponent {
  isFlyoutMultilevelOpen = false;
  flyoutMultilevelActiveIdentifier: string | undefined = undefined;

  onOpen(): void {
    this.isFlyoutMultilevelOpen = true;
  }
  onDismiss(): void {
    this.isFlyoutMultilevelOpen = false;
  }
  onUpdate(e: CustomEvent<FlyoutMultilevelUpdateEventDetail>): void {
    this.flyoutMultilevelActiveIdentifier = e.detail.activeIdentifier;
  }
}
