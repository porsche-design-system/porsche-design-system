/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

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

    <div class="playground light" title="should render scroller gradientColorScheme surface on light background">
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

    <div class="playground dark" title="should render scroller gradientColorScheme surface on dark background">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
