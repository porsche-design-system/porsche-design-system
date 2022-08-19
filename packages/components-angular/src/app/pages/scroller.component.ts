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
    <div class="playground light" title="should render scroller" style="max-width: 600px">
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

    <div class="playground dark" title="should render scroller on dark theme" style="max-width: 600px">
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

    <div
      class="playground light surface"
      title="should render scroller gradientColorScheme surface on light background"
      style="max-width: 600px"
    >
      <p-scroller [gradientColorScheme]="'surface'">
        <button>Light surface</button>
        <button>Light surface</button>
        <button>Light surface</button>
        <button>Light surface</button>
        <button>Light surface</button>
        <button>Light surface</button>
        <button>Light surface</button>
      </p-scroller>
    </div>

    <div
      class="playground dark surface"
      title="should render scroller gradientColorScheme surface on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'" [gradientColorScheme]="'surface'">
        <button>Dark surface</button>
        <button>Dark surface</button>
        <button>Dark surface</button>
        <button>Dark surface</button>
        <button>Dark surface</button>
        <button>Dark surface</button>
        <button>Dark surface</button>
      </p-scroller>
    </div>

    <div class="playground light-electric" title="should render scroller light-electric" style="max-width: 600px">
      <p-scroller [theme]="'light-electric'">
        <button>Light electric</button>
        <button>Light electric</button>
        <button>Light electric</button>
        <button>Light electric</button>
        <button>Light electric</button>
        <button>Light electric</button>
        <button>Light electric</button>
      </p-scroller>
    </div>

    <div class="playground dark-electric" title="should render scroller dark-electric" style="max-width: 600px">
      <p-scroller [theme]="'dark-electric'">
        <button>Dark electric</button>
        <button>Dark electric</button>
        <button>Dark electric</button>
        <button>Dark electric</button>
        <button>Dark electric</button>
        <button>Dark electric</button>
        <button>Dark electric</button>
      </p-scroller>
    </div>

    <div class="playground" title="should render scroller with 500px scrolled to position" style="max-width: 600px">
      <p-scroller [scrollToPosition]="{ scrollPosition: 500 }">
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      title="should render scroller with 500px scrolled to position on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'" [scrollToPosition]="{ scrollPosition: 500 }">
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
        <button>Scrolled to position x</button>
      </p-scroller>
    </div>

    <div class="playground" title="should render scroller with scroll indicator position top" style="max-width: 600px">
      <p-scroller [scrollIndicatorPosition]="'top'">
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      title="should render scroller with scroll indicator position top on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'" [scrollIndicatorPosition]="'top'">
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
        <button>Scroll indicator position top</button>
      </p-scroller>
    </div>

    <div
      class="playground light"
      title="should render scroller with scroll indicator size according to medium fontsize"
      style="max-width: 600px"
    >
      <p-scroller>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      title="should render scroller with scroll indicator size according to medium fontsize on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'">
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
        <button style="font-size: medium">Medium font</button>
      </p-scroller>
    </div>

    <div
      class="playground light"
      title="should render scroller with scroll indicator size according to large fontsize"
      style="max-width: 600px"
    >
      <p-scroller>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      title="should render scroller with scroll indicator size according to medium fontsize on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'">
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
        <button style="font-size: large">Large font</button>
      </p-scroller>
    </div>

    <div
      class="playground light"
      title="should render scroller with scroll indicator size according to inherit size"
      style="max-width: 600px"
    >
      <p-scroller>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      title="should render scroller with scroll indicator size according to inherit size on dark background"
      style="max-width: 600px"
    >
      <p-scroller [theme]="'dark'">
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
        <button [size]="'inherit'">Size inherit</button>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller only on screen size too small to show 8 buttons">
      <p-scroller>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
      </p-scroller>
    </div>

    <div
      class="playground dark"
      style="max-width: none !important"
      title="should render scroller only on screen size too small to show 8 buttons on dark background"
    >
      <p-scroller [theme]="'dark'">
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
        <button>Without max width</button>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
