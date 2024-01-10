import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { CarouselUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-events',
  template: `
    <p-carousel [heading]="'Some Heading'" (update)="onUpdate($event)">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </p-carousel>

    <p-text>Last event detail: {{ lastEventDetail }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselExampleEventsComponent {
  lastEventDetail = 'none';

  onUpdate(e: CustomEvent<CarouselUpdateEventDetail>) {
    this.lastEventDetail = JSON.stringify(e.detail);
  }
}
