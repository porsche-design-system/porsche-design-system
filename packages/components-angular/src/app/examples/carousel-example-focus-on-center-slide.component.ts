import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'page-carousel-example-focus-on-center-slide',
  template: `
    <p-carousel
      #carousel
      [slidesPerPage]="3"
      [focusOnCenterSlide]="true"
      [heading]="'Some Heading'"
      (update)="onCarouselUpdate($event)"
    >
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
      <div>Slide 5</div>
      <div>Slide 6</div>
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
})
export class CarouselExampleFocusOnCenterSlideComponent {
  @ViewChild('carousel', { static: true })
  carouselRef!: ElementRef<HTMLElement>;

  constructor() {
    /**
     * Defers execution to ensure the view is initialized before running the logic.
     * Necessary to avoid lifecycle hooks, as `getAngularProjectAndOpenOptions.ts` cannot handle them.
     */
    setTimeout(() => {
      this.initializeCarousel();
    }, 0);
  }

  private initializeCarousel(): void {
    const carousel = this.carouselRef.nativeElement;
    this.updateActiveSlide((carousel as any)['activeSlideIndex'] || 0);
  }

  onCarouselUpdate(event: any): void {
    this.updateActiveSlide(event.detail.activeIndex);
  }

  updateActiveSlide(activeSlideIndex: number): void {
    if (this.carouselRef) {
      const carousel = this.carouselRef.nativeElement;
      const slides = Array.from(carousel?.children || []) as HTMLElement[];
      slides.forEach((slide) => {
        slide.classList.remove('is-active', 'is-prev', 'is-next');
      });

      slides.forEach((slide, index) => {
        if (index === activeSlideIndex) {
          slide.classList.add('is-active');
        } else if (index === activeSlideIndex - 1) {
          slide.classList.add('is-prev');
        } else if (index === activeSlideIndex + 1) {
          slide.classList.add('is-next');
        }
      });
    }
  }
}
