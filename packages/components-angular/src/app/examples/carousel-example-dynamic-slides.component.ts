import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-carousel-example-dynamic-slides',
  template: `
    <p-carousel [slides-per-page]="2" [heading]="'Some Heading'">
      <div *ngFor="let _ of [].constructor(amountOfSlides); let i = index">Slide {{ i + 1 }}</div>
    </p-carousel>

    <button type="button" (click)="amountOfSlides = amountOfSlides + 1">Add Slide</button>
    <button type="button" (click)="amountOfSlides = amountOfSlides === 0 ? 0 : amountOfSlides - 1">Remove Slide</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselExampleDynamicSlidesComponent {
  amountOfSlides = 3;
}
