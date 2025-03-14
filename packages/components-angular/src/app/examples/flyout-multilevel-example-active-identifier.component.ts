import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  type FlyoutMultilevelUpdateEventDetail,
  PorscheDesignSystemModule,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-flyout-multilevel-example-active-identifier',
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
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-flyout-multilevel-item>
        <p-flyout-multilevel-item identifier="id-2" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#" aria-current="page">Some anchor</a>
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
      </p-flyout-multilevel>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class FlyoutMultilevelExampleActiveIdentifierComponent {
  isFlyoutMultilevelOpen = false;
  flyoutMultilevelActiveIdentifier: string | undefined = 'id-2';

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
