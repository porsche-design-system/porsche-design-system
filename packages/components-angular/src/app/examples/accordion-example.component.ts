import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion
      [open]="isAccordionOpen"
      (accordionChange)="handleAccordionChange($event)"
      heading="Some Heading"
      tag="h3"
    >
      <p-text>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p-text>
      <p-text>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat.
      </p-text>
    </p-accordion>
    <p-accordion
      [open]="isAccordionOpen"
      (accordionChange)="handleAccordionChange($event)"
      heading="Some Heading"
      tag="h3"
    >
      <p-text>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p-text>
      <p-text>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat.
      </p-text>
    </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExampleComponent {
  isAccordionOpen = false;

  handleAccordionChange(e: CustomEvent<AccordionChangeEvent>) {
    const { open } = e.detail;
    this.isAccordionOpen = open;
  }
}
