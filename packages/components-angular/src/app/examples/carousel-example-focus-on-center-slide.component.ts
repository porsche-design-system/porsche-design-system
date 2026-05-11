import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-focus-on-center-slide',
  template: `
    <p-carousel
      [ngStyle]="{ '--p-gradient-color-width': '25%' }"
      [slidesPerPage]="3"
      [focusOnCenterSlide]="true"
      [trimSpace]="false"
      [heading]="'Some Heading'"
      [gradientColor]="'background-surface'"
      (update)="onCarouselUpdate($event)"
      >
      @for (slide of slides; track slide; let i = $index) {
        <div [ngClass]="getSlideClass(i)">
          {{ slide }}
        </div>
      }
    </p-carousel>
    `,
  styles: `
    @use '@porsche-design-system/components-angular/styles' as *;

    p-carousel div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #00b0f4;
      height: 150px;
      transition: background 0.3s ease;
      color: $pds-theme-light-primary;
    }

    .is-active {
      background: #fc4040 !important;
    }

    .is-prev,
    .is-next {
      background: #f7cb47 !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PorscheDesignSystemModule],
})
export class CarouselExampleFocusOnCenterSlideComponent {
  slides: string[] = Array.from({ length: 6 }, (_, i) => `Slide ${i}`);
  private activeSlideIndex = 0;

  onCarouselUpdate(event: any): void {
    this.activeSlideIndex = event.detail.activeIndex;
  }

  getSlideClass(index: number): { [key: string]: boolean } {
    return {
      'is-active': index === this.activeSlideIndex,
      'is-prev': index === this.activeSlideIndex - 1,
      'is-next': index === this.activeSlideIndex + 1,
    };
  }
}
