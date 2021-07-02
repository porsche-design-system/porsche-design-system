import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion [open]="isAccordionOpen" (accordionChange)="onAccordionChange($event)" heading="Some Heading" tag="h3">
      <p-text>
        {{ content }}
      </p-text>
      <p-text>
        {{ content }}
      </p-text>
    </p-accordion>
    <p-accordion [open]="isAccordionOpen" (accordionChange)="onAccordionChange($event)" heading="Some Heading" tag="h3">
      <p-text>
        {{ content }}
      </p-text>
      <p-text>
        {{ content }}
      </p-text>
    </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExampleComponent {
  isAccordionOpen = false;
  content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  onAccordionChange(e: CustomEvent<AccordionChangeEvent>) {
    const { open } = e.detail;
    this.isAccordionOpen = open;
  }
}
