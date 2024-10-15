import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-carousel-example-dynamic-slides',
  template: `
    <p-carousel [slidesPerPage]="2" [heading]="'Some Heading'">
      <div *ngFor="let _ of [].constructor(amountOfSlides); let i = index">Slide {{ i + 1 }}</div>
    </p-carousel>

    <button type="button" (click)="amountOfSlides = amountOfSlides + 1">Add slide</button>
    <button type="button" (click)="amountOfSlides = amountOfSlides === 0 ? 0 : amountOfSlides - 1">
      Remove last slide
    </button>
  `,
  styles: `
    @use '@porsche-design-system/components-angular/styles' as *;

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
})
export class CarouselExampleDynamicSlidesComponent {
  amountOfSlides = 3;
}
