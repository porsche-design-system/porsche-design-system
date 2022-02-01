/* Auto Generated File */
// @ts-nocheck
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

    <div class="playground light" title="should render tabs-bar gradientColorScheme surface on light background">
      <p-tabs-bar [activeTabIndex]="0" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
      </p-tabs-bar>
    </div>

    <div class="playground dark" title="should render tabs-bar gradientColorScheme surface on dark background">
      <p-tabs-bar [activeTabIndex]="0" [theme]="'dark'" [gradientColorScheme]="'surface'">
        <a [href]="'#'">Tab 1</a>
        <a [href]="'#'">Tab 2</a>
        <a [href]="'#'">Tab 3</a>
        <a [href]="'#'">Tab 4</a>
        <a [href]="'#'">Tab 5</a>
        <a [href]="'#'">Tab 6</a>
        <a [href]="'#'">Tab 7</a>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarComponent {}
