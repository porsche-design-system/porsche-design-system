import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-popover-example-controlled',
  template: `
    <p-popover [open]="isPopoverOpen" (dismiss)="onDismiss()">
      <p-button-pure slot="button" [hideLabel]="true" [aria]="{ 'aria-expanded': isPopoverOpen }" (click)="onOpen()" icon="information">More information</p-button-pure>
      Some additional content with some <a href="#">link</a>.
    </p-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class PopoverExampleControlledComponent {
  isPopoverOpen = false;

  onOpen() {
    this.isPopoverOpen = true;
  }
  onDismiss() {
    this.isPopoverOpen = false;
  }
}
