/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-stepper-horizontal',
  template: `
    <div class="playground light" title="should render stepper horizontal with all numbers from 1 to 9 on light background">
      <p-stepper-horizontal>
        <p-stepper-horizontal-item>Small 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal with all numbers from 1 to 9 on dark background">
      <p-stepper-horizontal [theme]="'dark'">
        <p-stepper-horizontal-item>Small 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Small 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div
      class="playground light"
      title="should render stepper horizontal size medium with all numbers from 1 to 9 on light background"
    >
      <p-stepper-horizontal [size]="'medium'">
        <p-stepper-horizontal-item>Medium 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div
      class="playground dark"
      title="should render stepper horizontal size medium with all numbers from 1 to 9 on dark background"
    >
      <p-stepper-horizontal [theme]="'dark'" [size]="'medium'">
        <p-stepper-horizontal-item>Medium 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Medium 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal with all states on light background">
      <p-stepper-horizontal>
        <p-stepper-horizontal-item [state]="'current'">Current small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'">Warning small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Complete small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'" [disabled]="true">Warning Disabled small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'" [disabled]="true">Complete Disabled small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Default small</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal with all states on dark background">
      <p-stepper-horizontal [theme]="'dark'">
        <p-stepper-horizontal-item [state]="'current'">Current small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'">Warning small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Complete small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'" [disabled]="true">Warning Disabled small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'" [disabled]="true">Complete Disabled small</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Default small</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal size medium with all states on light background">
      <p-stepper-horizontal [size]="'medium'">
        <p-stepper-horizontal-item [state]="'current'">Current medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'">Warning medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Complete medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'" [disabled]="true">Warning Disabled medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'" [disabled]="true">Complete Disabled medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Default medium</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal size medium with all states on dark background">
      <p-stepper-horizontal [theme]="'dark'" [size]="'medium'">
        <p-stepper-horizontal-item [state]="'current'">Current medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'">Warning medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Complete medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'warning'" [disabled]="true">Warning Disabled medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'" [disabled]="true">Complete Disabled medium</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Default medium</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal with arrow left on light background">
      <p-stepper-horizontal style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal with arrow left on dark background">
      <p-stepper-horizontal [theme]="'dark'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal size medium with arrow left on light background">
      <p-stepper-horizontal [size]="'medium'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal size medium with arrow left on dark background">
      <p-stepper-horizontal [theme]="'dark'" [size]="'medium'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 5</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal with arrow left and right on light background">
      <p-stepper-horizontal style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal with arrow left and right on dark background">
      <p-stepper-horizontal [theme]="'dark'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div
      class="playground light"
      title="should render stepper horizontal size medium with arrow left and right on light background"
    >
      <p-stepper-horizontal [size]="'medium'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div
      class="playground dark"
      title="should render stepper horizontal size medium with arrow left and right on dark background"
    >
      <p-stepper-horizontal [theme]="'dark'" [size]="'medium'" style="max-width: 600px">
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Scrollable 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Scrollable 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground light" title="should render stepper horizontal size BreakpointCustomizable on light background">
      <p-stepper-horizontal [size]="{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }">
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>

    <div class="playground dark" title="should render stepper horizontal size BreakpointCustomizable on dark background">
      <p-stepper-horizontal
        [theme]="'dark'"
        [size]="{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }"
      >
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 1</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 2</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 3</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'complete'">Breakpoint 4</p-stepper-horizontal-item>
        <p-stepper-horizontal-item [state]="'current'">Scrollable Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 6</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 7</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 8</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Breakpoint 9</p-stepper-horizontal-item>
      </p-stepper-horizontal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperHorizontalComponent {}
