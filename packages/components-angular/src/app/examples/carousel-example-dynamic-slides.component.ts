import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-dynamic-slides',
  template: `
    <p-carousel [slidesPerPage]="2" [heading]="'Some Heading'">
      @for (_ of [].constructor(amountOfSlides); track _; let i = $index) {
        <div>Slide {{ i + 1 }}</div>
      }
    </p-carousel>

    <p-button type="button" (click)="amountOfSlides = amountOfSlides + 1">Add slide</p-button>
    <p-button type="button" (click)="amountOfSlides = amountOfSlides === 0 ? 0 : amountOfSlides - 1">
      Remove last slide
    </p-button>
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
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class CarouselExampleDynamicSlidesComponent {
  amountOfSlides = 3;
}
