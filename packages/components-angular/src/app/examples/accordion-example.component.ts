import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccordionUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-accordion-example',
  template: `
    <p-accordion [open]="isOpen1" (update)="onUpdate1($event)">
      <p-heading slot="summary" tag="h3" size="small">{{ summary }}</p-heading>
      <p-text>{{ content }}</p-text>
    </p-accordion>
    <p-accordion [open]="isOpen2" (update)="onUpdate2($event)">
      <p-heading slot="summary" tag="h3" size="small">{{ summary }}</p-heading>
      <p-text>{{ content }}</p-text>
    </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionExampleComponent {
  isOpen1 = false;
  isOpen2 = false;
  summary = 'Some summary';
  content =
    'Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  onUpdate1(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.isOpen1 = e.detail.open;
  }
  onUpdate2(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.isOpen2 = e.detail.open;
  }
}
