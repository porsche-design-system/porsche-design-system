import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-carousel-example-jump-to-slide',
  template: `
    <p-carousel [heading]="'Some Heading'" [activeSlideIndex]="activeSlideIndex" (update)="onUpdate($event)">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </p-carousel>

    @for (_ of [].constructor(3); track _; let i = $index) {
      <p-button
        type="button"
        (click)="onButtonClick($event)"
        [disabled]="activeSlideIndex === i"
        >
        {{ i + 1 }}
      </p-button>
    }
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
export class CarouselExampleJumpToSlideComponent {
  activeSlideIndex = 1;

  onUpdate(e: CustomEvent<CarouselUpdateEventDetail>) {
    this.activeSlideIndex = e.detail.activeIndex;
  }
  onButtonClick(e: MouseEvent) {
    this.activeSlideIndex = parseInt((e.target as HTMLButtonElement).innerText) - 1;
  }
}
