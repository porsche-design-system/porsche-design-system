import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-media-query-example',
  styleUrls: ['./design-tokens-media-query-example.component.scss'],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Media Query (change viewport to see effect)</h3>
        <p class="media-query-min text">Media Query Min:</p>
        <p class="media-query-max text">Media Query Max:</p>
        <p class="media-query-min-max text">Media Query Min Max:</p>
      </div>
      <div class="wrapper">
        <h3 class="heading">Breakpoint</h3>
        <p class="breakpoint-base text">Breakpoint Base:</p>
        <p class="breakpoint-xs text">Breakpoint XS:</p>
        <p class="breakpoint-s text">Breakpoint S:</p>
        <p class="breakpoint-m text">Breakpoint M:</p>
        <p class="breakpoint-l text">Breakpoint L:</p>
        <p class="breakpoint-xl text">Breakpoint XL:</p>
        <p class="breakpoint-xxl text">Breakpoint XXL:</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensMediaQueryExampleComponent {}
