/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  template: `
    <div class="playground light" title="should render tabs on light background">
      <p-tabs>
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs on dark background">
      <p-tabs [theme]="'dark'">
        <p-tabs-item [label]="'Tab 1'"><div style="color: white">Tab Content 1</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs with last tab selected on light background">
      <p-tabs [activeTabIndex]="6">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs with last tab selected on dark background">
      <p-tabs [activeTabIndex]="6" [theme]="'dark'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'"><div style="color: white">Tab Content 7</div></p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs size medium on light background">
      <p-tabs [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs size medium on dark background">
      <p-tabs [theme]="'dark'" [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'"><div style="color: white">Tab Content 1</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs size medium with last tab selected on light background">
      <p-tabs [activeTabIndex]="6" [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs size medium with last tab selected on dark background">
      <p-tabs [activeTabIndex]="6" [theme]="'dark'" [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'"><div style="color: white">Tab Content 7</div></p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs semibold on light background">
      <p-tabs [weight]="'semibold'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs semibold on dark background">
      <p-tabs [theme]="'dark'" [weight]="'semibold'">
        <p-tabs-item [label]="'Tab 1'"><div style="color: white">Tab Content 1</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs semibold and medium on light background">
      <p-tabs [weight]="'semibold'" [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs semibold and medium on dark background">
      <p-tabs [theme]="'dark'" [weight]="'semibold'" [size]="'medium'">
        <p-tabs-item [label]="'Tab 1'"><div style="color: white">Tab Content 1</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render tabs gradientColorScheme surface on light background">
      <p-tabs [gradientColorScheme]="'surface'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render tabs gradientColorScheme surface on dark background">
      <p-tabs [theme]="'dark'" [gradientColorScheme]="'surface'">
        <p-tabs-item [label]="'Tab 1'"><div style="color: white">Tab Content 1</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground light" title="should render selected tab in viewport on light background">
      <p-tabs [activeTabIndex]="3">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'">Tab Content 4</p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
        <p-tabs-item [label]="'Tab 8'">Tab Content 8</p-tabs-item>
        <p-tabs-item [label]="'Tab 9'">Tab Content 9</p-tabs-item>
        <p-tabs-item [label]="'Tab 10'">Tab Content 10</p-tabs-item>
      </p-tabs>
    </div>

    <div class="playground dark" title="should render selected tab in viewport in viewport on dark background">
      <p-tabs [activeTabIndex]="3" [theme]="'dark'">
        <p-tabs-item [label]="'Tab 1'">Tab Content 1</p-tabs-item>
        <p-tabs-item [label]="'Tab 2'">Tab Content 2</p-tabs-item>
        <p-tabs-item [label]="'Tab 3'">Tab Content 3</p-tabs-item>
        <p-tabs-item [label]="'Tab 4'"><div style="color: white">Tab Content 4</div></p-tabs-item>
        <p-tabs-item [label]="'Tab 5'">Tab Content 5</p-tabs-item>
        <p-tabs-item [label]="'Tab 6'">Tab Content 6</p-tabs-item>
        <p-tabs-item [label]="'Tab 7'">Tab Content 7</p-tabs-item>
        <p-tabs-item [label]="'Tab 8'">Tab Content 8</p-tabs-item>
        <p-tabs-item [label]="'Tab 9'">Tab Content 9</p-tabs-item>
        <p-tabs-item [label]="'Tab 10'">Tab Content 10</p-tabs-item>
      </p-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {}
