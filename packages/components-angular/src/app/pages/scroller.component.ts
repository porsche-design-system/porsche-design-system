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
        line-height: 1.5;
        font-size: 16px;
      }
    
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        width: 300px;
        border: 1px solid deeppink;
      }
    
      .scroller > span:not(:last-child) {
        margin-right: 1rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render scroller on light background">
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
    </div>

    <div class="playground dark" title="should render scroller on dark background">
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

    <div class="playground light-electric" title="should render scroller on light-electric background">
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

    <div
      class="playground light surface"
      title="should render scroller gradientColorScheme surface on light surface background"
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

    <div class="playground light" title="should render scroller with scroll indicator position center on light background">
      <div style="height: 50px; border: 1px solid deeppink; max-width: 600px">
        <p-scroller [scrollIndicatorPosition]="'center'">
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
          <button>Scroll indicator position center</button>
        </p-scroller>
      </div>
    </div>

    <div class="playground light" title="should render scroller with scroll indicator position top on light background">
      <div style="height: 50px; border: 1px solid deeppink; max-width: 600px">
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
    </div>

    <div
      class="playground light"
      title="should render scroller with scroll indicator size according to fontsize large on light background"
    >
      <p-scroller style="font-size: 2.25rem; line-height: 1.3333333333">
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
        <a [href]="'#'">Large font</a>
      </p-scroller>
    </div>

    <div
      class="playground light"
      title="should render scroller with scroll indicator size according to inherit size on light background"
    >
      <div style="font-size: 2.25rem; line-height: 1.3333333333">
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

    <div
      class="playground light"
      title="should render scroller only on screen size too small to show 8 buttons on light background"
    >
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

    <div class="playground light" title="should render scroller items with linebreaks on light background">
      <p-scroller style="white-space: normal">
        <button>Button text that breaks line</button>
        <button>Button text that breaks line</button>
        <button>Button text that breaks line</button>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller with initial scroll position on light background">
      <div style="max-width: 600px">
        <p-scroller class="scroller" [scrollToPosition]="{scrollPosition: 290}">
          <span>Start</span>
          <span>Middle</span>
          <span>End</span>
        </p-scroller>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
