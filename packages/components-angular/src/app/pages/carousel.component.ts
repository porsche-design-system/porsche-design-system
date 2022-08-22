/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-carousel',
  styles: [
    `
      p-carousel div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #00b0f4;
        height: 100px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render carousel on light background">
      <p-carousel [heading]="'Heading'">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground dark" title="should render carousel on dark background">
      <p-carousel [heading]="'Heading'" [theme]="'dark'">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with slotted heading on light background">
      <p-carousel>
        <h2 slot="heading">Slotted heading</h2>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground dark" title="should render carousel with slotted heading on dark background">
      <p-carousel [theme]="'dark'">
        <h2 slot="heading">Slotted heading</h2>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with wrapped heading on light background">
      <p-carousel [heading]="'Wrapped heading'" [wrapHeading]="true">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with wrapped slotted heading on light background">
      <p-carousel [wrapHeading]="true">
        <h2 slot="heading">Wrapped slotted heading</h2>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with multiline heading on light background">
      <p-carousel [heading]="'Multiline heading could be quite long especially on smaller screens but it wraps luckily'">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with slidesPerPage=2 light background">
      <p-carousel [heading]="'Slides per page: 2'" [slidesPerPage]="2">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with slidesPerPage=3 light background">
      <p-carousel [heading]="'Slides per page: 3'" [slidesPerPage]="3">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with slidesPerPage=4 light background">
      <p-carousel [heading]="'Slides per page: 4'" [slidesPerPage]="4">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with slidesPerPage=5 light background">
      <p-carousel [heading]="'Slides per page: 5'" [slidesPerPage]="4">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with responsive slidesPerPage on light background">
      <p-carousel [heading]="'Responsive slides per page'" [slidesPerPage]="{base: 2, s: 3, m: 4, l: 5, xl: 6}">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
        <div>Slide 6</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with disablePagination on light background">
      <p-carousel [heading]="'Disabled pagination'" [disablePagination]="true">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div class="playground light" title="should render carousel with responsive disablePagination on light background">
      <p-carousel [heading]="'Responsive disabled pagination'" [disablePagination]="{base: false, m: true}">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>

    <div
      class="playground light"
      title="should render carousel with overflowVisible on light background"
      style="padding: 0 5vw; overflow-x: hidden"
    >
      <p-carousel [heading]="'Overflow Visible'" [overflowVisible]="true">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {}
