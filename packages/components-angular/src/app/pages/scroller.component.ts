/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-scroller',
  styles: [
    `
      p-scroller > * {
        padding: 40px;
        border: 1px solid deeppink;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render scroller">
      <p-scroller>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
      <p-scroller>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
      </p-scroller>
      <p-scroller>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
      </p-scroller>
    </div>

    <div class="playground dark" title="should render scroller on dark theme">
      <p-scroller [theme]="'dark'">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
      <p-scroller [theme]="'dark'">
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
        <a [href]="'#'">Link</a>
      </p-scroller>
      <p-scroller [theme]="'dark'">
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
        <p>Paragraph</p>
      </p-scroller>
    </div>

    <div class="playground light surface" title="should render scroller gradientColorScheme surface on light background">
      <p-scroller [gradientColorScheme]="'surface'">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>

    <div class="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
      <p-scroller [theme]="'dark'" [gradientColorScheme]="'surface'">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>

    <div class="playground" title="should render scroller with 500 px scrolled to position">
      <p-scroller [scrollToPosition]="{ scrollPosition: 500 }">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>

    <div class="playground dark" title="should render scroller with 500 px scrolled to position on dark background">
      <p-scroller [theme]="'dark'" [scrollToPosition]="{ scrollPosition: 500 }">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>

    <div class="playground" title="should render scroller with scroll indicator position top">
      <p-scroller [scrollIndicatorPosition]="'top'">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>

    <div class="playground dark" title="should render scroller with scroll indicator position top on dark background">
      <p-scroller [theme]="'dark'" [scrollIndicatorPosition]="'top'">
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
        <button>Button</button>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
