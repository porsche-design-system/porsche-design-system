import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

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
  styles: `
    @use '@porsche-design-system/components-angular/scss' as *;

    p-carousel div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #00b0f4;
      height: 150px;
      color: $pds-theme-light-primary;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class CarouselExampleEventsComponent {
  lastEventDetail = 'none';

  onUpdate(e: CustomEvent<CarouselUpdateEventDetail>) {
    this.lastEventDetail = JSON.stringify(e.detail);
  }
}
