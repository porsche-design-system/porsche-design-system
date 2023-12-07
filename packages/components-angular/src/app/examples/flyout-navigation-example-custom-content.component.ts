import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type FlyoutNavigationUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-navigation-example-custom-content',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      p-link-pure {
        margin: 0 calc(#{$pds-spacing-fluid-small} * -1);
        padding: $pds-spacing-fluid-small;
      }
    `,
  ],
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout Navigation</p-button>
    <p-flyout-navigation
      [open]="isFlyoutNavigationOpen"
      [activeIdentifier]="flyoutNavigationActiveIdentifier"
      (dismiss)="onDismiss()"
      (update)="onUpdate($event)"
    >
      <p-flyout-navigation-item identifier="item-1" label="Some Label">
        <p-link-tile
          href="#"
          label="Some label"
          description="Some Description"
          weight="semi-bold"
          compact="true"
          aspectRatio="{base: '4:3', xs: '16:9', s: '1:1'}"
        >
          <img
            srcset="https://porsche-design-system.github.io/porsche-design-system/porsche-963@2x.webp 2x"
            src="https://porsche-design-system.github.io/porsche-design-system/porsche-963.webp"
            width="636"
            height="847"
            alt="Porsche 963"
          />
        </p-link-tile>
        <h3>Some heading</h3>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor" aria-current="page">Some anchor</a>
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
      <p-link-pure size="medium" href="#" icon="external">Some external anchor</p-link-pure>
    </p-flyout-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutNavigationExampleCustomContentComponent {
  isFlyoutNavigationOpen = false;
  flyoutNavigationActiveIdentifier: string | undefined = 'item-1';

  onOpen(): void {
    this.isFlyoutNavigationOpen = true;
  }
  onDismiss(): void {
    this.isFlyoutNavigationOpen = false;
  }
  onUpdate(e: CustomEvent<FlyoutNavigationUpdateEvent>): void {
    this.flyoutNavigationActiveIdentifier = e.detail.activeIdentifier;
  }
}
