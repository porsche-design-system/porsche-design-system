/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-scroller',
  styles: [
    `
      p-scroller {
        white-space: nowrap;
        max-width: 600px;
      }
      p-scroller > *:not(:last-child) {
        margin-right: 0.5rem;
      }
      p-scroller > button {
        font-size: 16px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render scroller">
      <p-scroller>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
        <button>Default Light</button>
      </p-scroller>
      <p-scroller>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
        <a [href]="'#'">Some link</a>
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
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
        <button>Default dark</button>
      </p-scroller>
    </div>

    <div class="playground light-electric" title="should render scroller light-electric">
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

    <div class="playground light surface" title="should render scroller gradientColorScheme surface on light background">
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

    <div class="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
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

    <div class="playground" title="should render scroller with scroll indicator position center">
      <div style="height: 50px; border: 1px solid deeppink; max-width: 600px">
        <p-scroller [scrollIndicatorPosition]="'center'">
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
          <a [href]="'#'">Scroll indicator position center</a>
        </p-scroller>
      </div>
    </div>

    <div class="playground" title="should render scroller with scroll indicator position top">
      <div style="height: 50px; border: 1px solid deeppink; max-width: 600px">
        <p-scroller [scrollIndicatorPosition]="'top'">
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
          <a [href]="'#'">Scroll indicator position top</a>
        </p-scroller>
      </div>
    </div>

    <div class="playground light" title="should render scroller with scroll indicator size according to fontsize large">
      <p-scroller style="font-size: large">
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller with scroll indicator size according to inherit size">
      <div style="font-size: large">
        <p-scroller style="font-size: inherit">
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
          <a [href]="'#'">Size inherit</a>
        </p-scroller>
      </div>
    </div>

    <div class="playground light" title="should render scroller only on screen size too small to show 8 buttons">
      <p-scroller style="max-width: none">
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

    <div class="playground light" title="should render scroller items with linebreaks">
      <p-scroller style="white-space: normal">
        <button>Button text that breaks line</button>
        <button>Button text that breaks line</button>
        <button>Button text that breaks line</button>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller with scroll position 290px">
      <p-scroller class="scroller" [scrollToPosition]="{scrollPosition: 290}">
        <span>Start</span>
        <span>Middle</span>
        <span>End</span>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
