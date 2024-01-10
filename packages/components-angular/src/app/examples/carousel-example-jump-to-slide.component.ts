import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { CarouselUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-jump-to-slide',
  template: `
    <p-carousel [heading]="'Some Heading'" [activeSlideIndex]="activeSlideIndex" (update)="onUpdate($event)">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </p-carousel>

    <button
      *ngFor="let _ of [].constructor(3); let i = index"
      type="button"
      (click)="onButtonClick($event)"
      [disabled]="activeSlideIndex === i"
    >
      {{ i + 1 }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselExampleJumpToSlideComponent {
  activeSlideIndex = 1;

  onUpdate(e: CustomEvent<CarouselUpdateEventDetail>) {
    this.activeSlideIndex = e.detail.activeIndex;
  }
  onButtonClick(e: MouseEvent) {
    this.activeSlideIndex = parseInt((e.target as HTMLButtonElement).innerText) - 1;
  }
}
