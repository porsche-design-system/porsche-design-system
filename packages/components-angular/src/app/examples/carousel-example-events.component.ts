import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { CarouselChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-events',
  template: `
    <p-carousel [heading]="'Some Heading'" (carouselChange)="onCarouselChange($event)">
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

  onCarouselChange(e: CustomEvent<CarouselChangeEvent>) {
    this.lastEventDetail = JSON.stringify(e.detail);
  }
}
