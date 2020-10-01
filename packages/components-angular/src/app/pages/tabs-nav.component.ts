import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs-nav',
  template: `
    <div class="playground light" title="should render tabs on light background">
      <p-tabs-nav>
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs on dark background">
      <p-tabs-nav [theme]="'dark'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs with last tab selected on light background">
      <p-tabs-nav [activeTabIndex]="6">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs with last tab selected on dark background">
      <p-tabs-nav [activeTabIndex]="6" [theme]="'dark'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs size medium on light background">
      <p-tabs-nav [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs size medium on dark background">
      <p-tabs-nav [theme]="'dark'" [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs size medium with last tab selected on light background">
      <p-tabs-nav [activeTabIndex]="6" [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs size medium with last tab selected on dark background">
      <p-tabs-nav [activeTabIndex]="6" [theme]="'dark'" [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs semibold on light background">
      <p-tabs-nav [weight]="'semibold'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs semibold on dark background">
      <p-tabs-nav [theme]="'dark'" [weight]="'semibold'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs semibold and medium on light background">
      <p-tabs-nav [weight]="'semibold'" [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs semibold and medium on dark background">
      <p-tabs-nav [theme]="'dark'" [weight]="'semibold'" [size]="'medium'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render tabs gradientColorScheme surface on light background">
      <p-tabs-nav [gradientColorScheme]="'surface'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render tabs gradientColorScheme surface on dark background">
      <p-tabs-nav [theme]="'dark'" [gradientColorScheme]="'surface'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
      </p-tabs-nav>
    </div>

    <div class="playground light" title="should render selected tab in viewport on light background">
      <p-tabs-nav [activeTabIndex]="3">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
        <a>Tab 8</a>
        <a>Tab 9</a>
        <a>Tab 10</a>
      </p-tabs-nav>
    </div>

    <div class="playground dark" title="should render selected tab in viewport in viewport on dark background">
      <p-tabs-nav [activeTabIndex]="3" [theme]="'dark'">
        <a>Tab 1</a>
        <a>Tab 2</a>
        <a>Tab 3</a>
        <a>Tab 4</a>
        <a>Tab 5</a>
        <a>Tab 6</a>
        <a>Tab 7</a>
        <a>Tab 8</a>
        <a>Tab 9</a>
        <a>Tab 10</a>
      </p-tabs-nav>
    </div>
  `
})
export class TabsNavComponent {}
