import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type FlyoutMultilevelUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-multilevel-example-custom-content',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      p-link-tile {
        margin-bottom: $pds-spacing-fluid-small;
      }

      p-link-pure {
        margin: 0 calc(#{$pds-spacing-fluid-small} * -1);
        padding: $pds-spacing-fluid-small;
      }
    `,
  ],
  template: `
    <nav aria-label="Main">
      <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout Multilevel</p-button>
      <p-flyout-multilevel
        [open]="isFlyoutMultilevelOpen"
        [activeIdentifier]="flyoutMultilevelActiveIdentifier"
        (dismiss)="onDismiss()"
        (update)="onUpdate($event)"
      >
        <p-flyout-multilevel-item identifier="id-1" label="Some Label">
          <p-link-tile
            href="#"
            label="Some label"
            description="Some Description"
            weight="semi-bold"
            [compact]="true"
            [aspectRatio]="{ base: '4/3', xs: '16/9', s: '1/1' }"
          >
            <img
              srcset="http://localhost:3002/porsche-963@2x.webp 2x"
              src="http://localhost:3002/porsche-963.webp"
              width="636"
              height="847"
              alt="Porsche 963"
            />
          </p-link-tile>
          <a href="#">Some anchor</a>
          <a href="#" aria-current="page">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-flyout-multilevel-item identifier="id-2" label="Some Label">
          <p-flyout-multilevel-item identifier="id-2-1" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </p-flyout-multilevel-item>
          <p-flyout-multilevel-item identifier="id-2-2" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </p-flyout-multilevel-item>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-flyout-multilevel-item identifier="id-3" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-flyout-multilevel-item identifier="id-4" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-flyout-multilevel-item identifier="id-5" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-link-pure size="medium" href="#" icon="external">Some external anchor</p-link-pure>
      </p-flyout-multilevel>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FlyoutMultilevelExampleCustomContentComponent {
  isFlyoutMultilevelOpen = false;
  flyoutMultilevelActiveIdentifier: string | undefined = 'id-1';

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
