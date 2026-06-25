import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type AccordionUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-accordion [open]="open" [sticky]="true" background="surface" class="[--p-accordion-summary-top:40px]" (update)="onUpdate($event)">
        <p-heading slot="summary" tag="h3" size="small" weight="semibold">
          Some summary
        </p-heading>
        <p-text>
          Some details. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p-text>
      </p-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  open = true;

  onUpdate(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.open = e.detail.open;
  }
}
