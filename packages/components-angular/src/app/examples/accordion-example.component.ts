import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { AccordionUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion [heading]="'Some Heading'" [tag]="'h3'" [open]="isOpen1" (update)="onUpdate1($event)">
      <p-text>{{ content }}</p-text>
    </p-accordion>
    <p-accordion [heading]="'Some Heading'" [tag]="'h3'" [open]="isOpen2" (update)="onUpdate2($event)">
      <p-text>{{ content }}</p-text>
    </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExampleComponent {
  isOpen1 = false;
  isOpen2 = false;
  content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  onUpdate1(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.isOpen1 = e.detail.open;
  }
  onUpdate2(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.isOpen2 = e.detail.open;
  }
}
