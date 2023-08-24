/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-scroller',
  styles: [
    `
      p-scroller {
        max-width: 600px;
      }
    
      .playground > div {
        height: 3rem;
        border: 1px solid deeppink;
        max-width: 600px;
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
    </div>

    <div class="playground light surface" title="should render scroller gradientColorScheme surface on surface background">
      <p-scroller [gradientColorScheme]="'surface'">
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
    </div>

    <div class="playground light surface" title="should render scroller gradientColor surface on surface background">
      <p-scroller [gradientColor]="'background-surface'">
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
    </div>

    <div class="playground light" title="should render scroller with scrollIndicatorPosition center">
      <div>
        <p-scroller [scrollIndicatorPosition]="'center'">
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
      </div>
    </div>

    <div class="playground light" title="should render scroller with scrollIndicatorPosition top">
      <div>
        <p-scroller [scrollIndicatorPosition]="'top'">
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
      </div>
    </div>

    <div class="playground light" title="should render scroller with alignScrollIndicator center">
      <div>
        <p-scroller [alignScrollIndicator]="'center'">
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
      </div>
    </div>

    <div class="playground light" title="should render scroller with alignScrollIndicator top">
      <div>
        <p-scroller [alignScrollIndicator]="'top'">
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
      </div>
    </div>

    <div class="playground light" title="should render scroller only on screen size too small to show all buttons at once">
      <p-scroller style="max-width: none">
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
    </div>

    <div class="playground light" title="should render scroller items with linebreaks">
      <p-scroller>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
        <button>Button with line break</button>
      </p-scroller>
    </div>

    <div class="playground light" title="should render scroller with initial scroll position">
      <p-scroller class="scroller" [scrollToPosition]="{scrollPosition: 100}">
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
    </div>

    <div class="playground light" title="should render scroller with scrollbar">
      <div>
        <p-scroller [scrollbar]="true">
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
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
