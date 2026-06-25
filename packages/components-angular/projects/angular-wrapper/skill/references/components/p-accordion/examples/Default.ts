import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type AccordionUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-accordion [open]="open" (update)="onUpdate($event)">
        <p-heading slot="summary" tag="h2" size="small" weight="semibold">
          Some summary
        </p-heading>
        <p-text>
          Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </p-text>
      </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  open = false;

  onUpdate(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.open = e.detail.open;
  }
}
