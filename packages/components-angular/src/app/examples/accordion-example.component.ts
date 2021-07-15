import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { AccordionChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion
      heading="Some Heading"
      tag="h3"
      [open]="isAccordion1Open"
      (accordionChange)="onAccordion1Change($event)"
    >
      <p-text>{{ content }}</p-text>
    </p-accordion>
    <p-accordion
      heading="Some Heading"
      tag="h3"
      [open]="isAccordion2Open"
      (accordionChange)="onAccordion2Change($event)"
    >
      <p-text>{{ content }}</p-text>
    </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExampleComponent {
  isAccordion1Open = false;
  isAccordion2Open = false;
  content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  onAccordion1Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion1Open = e.detail.open;
  }
  onAccordion2Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion2Open = e.detail.open;
  }
}
