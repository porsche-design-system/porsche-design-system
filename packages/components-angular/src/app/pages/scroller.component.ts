/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-scroller',
  template: `
    <div class="playground light" title="should render scroller on light background">
      <p-scroller>
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div class="playground dark" title="should render scroller on dark background">
      <p-scroller [theme]="'dark'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller with prev button on light background">
      <p-scroller [dataId]="'prev-light'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div class="playground dark" title="should render scroller with prev button on dark background">
      <p-scroller [dataId]="'prev-dark'" [theme]="'dark'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div class="playground light surface" title="should render scroller gradientColorScheme surface on light background">
      <p-scroller [gradientColorScheme]="'surface'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div class="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
      <p-scroller [theme]="'dark'" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div
      class="playground light surface"
      title="should render scroller with prev button and gradientColorScheme surface on light background"
    >
      <p-scroller [dataId]="'prev-surface-light'" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>

    <div
      class="playground dark surface"
      title="should render scroller with prev button and gradientColorScheme surface on dark background"
    >
      <p-scroller [dataId]="'prev-surface-dark'" [theme]="'dark'" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Anchor 1</a>
        <a [href]="'#'">Anchor 2</a>
        <a [href]="'#'">Anchor 3</a>
        <a [href]="'#'">Anchor 4</a>
        <a [href]="'#'">Anchor 5</a>
        <a [href]="'#'">Anchor 6</a>
        <a [href]="'#'">Anchor 7</a>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent implements OnInit {
  ngOnInit() {
    // Use alias for function to bypass setAllReady in generateAngularReactVRTPages.ts
    const PDSReady = componentsReady;
    PDSReady().then(() => {
      document.querySelectorAll(`p-scroller[data-id^='prev']`).forEach((scroller) => {
        scroller.shadowRoot.querySelector('.action--next p-button-pure').click();
      });
    });
  }
}
