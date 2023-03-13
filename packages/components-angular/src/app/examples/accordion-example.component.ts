import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { AccordionChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion [heading]="'Some Heading'" [tag]="'h3'" [open]="isOpen1" (change)="onChange1($event)">
      <p-text>{{ content }}</p-text>
    </p-accordion>
    <p-accordion [heading]="'Some Heading'" [tag]="'h3'" [open]="isOpen2" (change)="onChange2($event)">
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

  onChange1(e: CustomEvent<AccordionChangeEvent>) {
    this.isOpen1 = e.detail.open;
  }
  onChange2(e: CustomEvent<AccordionChangeEvent>) {
    this.isOpen2 = e.detail.open;
  }
}
