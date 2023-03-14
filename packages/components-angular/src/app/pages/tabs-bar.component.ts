/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar',
  template: `
    <div class="playground light" title="should render tabs-bar on light background">
      <p-tabs-bar [activeTabIndex]="0">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar with last tab selected on light background">
      <p-tabs-bar [activeTabIndex]="6">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar with last tab selected on dark background">
      <p-tabs-bar [activeTabIndex]="6" [theme]="'dark'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar size medium on light background">
      <p-tabs-bar [activeTabIndex]="0" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar size medium on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar size medium with last tab selected on light background">
      <p-tabs-bar [activeTabIndex]="6" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar size medium with last tab selected on dark background">
      <p-tabs-bar [activeTabIndex]="6" [theme]="'dark'" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar size BreakpointCustomizable on light background">
      <p-tabs-bar
        [activeTabIndex]="9"
        [size]="{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }"
      >
        <button [type]="'button'">Tab One</button>
        <button [type]="'button'">Tab Two</button>
        <button [type]="'button'">Tab Three</button>
        <button [type]="'button'">Tab Four</button>
        <button [type]="'button'">Tab Five</button>
        <button [type]="'button'">Tab Six</button>
        <button [type]="'button'">Tab Seven</button>
        <button [type]="'button'">Tab Eight</button>
        <button [type]="'button'">Tab Nine</button>
        <button [type]="'button'">Tab Ten</button>
        <button [type]="'button'">Tab Eleven</button>
        <button [type]="'button'">Tab Twelve</button>
        <button [type]="'button'">Tab Thirteen</button>
        <button [type]="'button'">Tab Fourteen</button>
        <button [type]="'button'">Tab Fifteen</button>
        <button [type]="'button'">Tab Sixteen</button>
        <button [type]="'button'">Tab Seventeen</button>
        <button [type]="'button'">Tab Eighteen</button>
        <button [type]="'button'">Tab Nineteen</button>
        <button [type]="'button'">Tab Twenty</button>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar semibold on light background">
      <p-tabs-bar [activeTabIndex]="0" [weight]="'semibold'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar semibold on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [weight]="'semibold'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render tabs-bar semibold and medium on light background">
      <p-tabs-bar [activeTabIndex]="0" [weight]="'semibold'" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar semibold and medium on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [weight]="'semibold'" [size]="'medium'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light surface" title="should render tabs-bar gradientColorScheme surface on light background">
      <p-tabs-bar [activeTabIndex]="0" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Tab gradientColorScheme 1</a>
        <a [href]="'#'">Tab gradientColorScheme 2</a>
        <a [href]="'#'">Tab gradientColorScheme 3</a>
        <a [href]="'#'">Tab gradientColorScheme 4</a>
        <a [href]="'#'">Tab gradientColorScheme 5</a>
        <a [href]="'#'">Tab gradientColorScheme 6</a>
        <a [href]="'#'">Tab gradientColorScheme 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark surface" title="should render tabs-bar gradientColorScheme surface on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Tab gradientColorScheme 1</a>
        <a [href]="'#'">Tab gradientColorScheme 2</a>
        <a [href]="'#'">Tab gradientColorScheme 3</a>
        <a [href]="'#'">Tab gradientColorScheme 4</a>
        <a [href]="'#'">Tab gradientColorScheme 5</a>
        <a [href]="'#'">Tab gradientColorScheme 6</a>
        <a [href]="'#'">Tab gradientColorScheme 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light surface" title="should render tabs-bar gradientColor surface on light background">
      <p-tabs-bar [activeTabIndex]="0" [gradientColor]="'background-surface'">
        <a [href]="'#'">Tab gradientColor 1</a>
        <a [href]="'#'">Tab gradientColor 2</a>
        <a [href]="'#'">Tab gradientColor 3</a>
        <a [href]="'#'">Tab gradientColor 4</a>
        <a [href]="'#'">Tab gradientColor 5</a>
        <a [href]="'#'">Tab gradientColor 6</a>
        <a [href]="'#'">Tab gradientColor 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark surface" title="should render tabs-bar gradientColor surface on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [gradientColor]="'background-surface'">
        <a [href]="'#'">Tab gradientColor 1</a>
        <a [href]="'#'">Tab gradientColor 2</a>
        <a [href]="'#'">Tab gradientColor 3</a>
        <a [href]="'#'">Tab gradientColor 4</a>
        <a [href]="'#'">Tab gradientColor 5</a>
        <a [href]="'#'">Tab gradientColor 6</a>
        <a [href]="'#'">Tab gradientColor 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render selected tab in viewport on light background">
      <p-tabs-bar [activeTabIndex]="3">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
        <a [href]="'#'">Tab 8</a>
        <a [href]="'#'">Tab 9</a>
        <a [href]="'#'">Tab 10</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render selected tab in viewport in viewport on dark background">
      <p-tabs-bar [activeTabIndex]="3" [theme]="'dark'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
        <a [href]="'#'">Tab 8</a>
        <a [href]="'#'">Tab 9</a>
        <a [href]="'#'">Tab 10</a>
      </p-tabs-bar>
    </div>

    <div class="playground light" title="should render no selected tab when active-tab-index is not set">
      <p-tabs-bar>
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
        <a [href]="'#'">Tab 8</a>
        <a [href]="'#'">Tab 9</a>
        <a [href]="'#'">Tab 10</a>
      </p-tabs-bar>
    </div>

    <div
      class="playground light"
      style="padding: 0 50px"
      title="should render tabs-bar with parent padding on light background"
    >
      <p-tabs-bar [activeTabIndex]="0">
        <a [href]="'#'">Parent padding 1</a>
        <a [href]="'#'">Parent padding 2</a>
        <a [href]="'#'">Parent padding 3</a>
        <a [href]="'#'">Parent padding 4</a>
        <a [href]="'#'">Parent padding 5</a>
        <a [href]="'#'">Parent padding 6</a>
        <a [href]="'#'">Parent padding 7</a>
        <a [href]="'#'">Parent padding 8</a>
        <a [href]="'#'">Parent padding 9</a>
        <a [href]="'#'">Parent padding 10</a>
      </p-tabs-bar>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarComponent {}
