/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-model-signature',
  styles: [
    `
      @media only screen and (min-width: 760px) {
        #app,
        :host {
          display: grid;
          grid-template-columns: repeat(2, 50%);
        }
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render for model 718 on light background">
      <p-model-signature [model]="'718'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model 718 on dark background">
      <p-model-signature [model]="'718'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model 911 on light background">
      <p-model-signature [model]="'911'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model 911 on dark background">
      <p-model-signature [model]="'911'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model boxster on light background">
      <p-model-signature [model]="'boxster'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model boxster on dark background">
      <p-model-signature [model]="'boxster'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model cayenne on light background">
      <p-model-signature [model]="'cayenne'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model cayenne on dark background">
      <p-model-signature [model]="'cayenne'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model cayman on light background">
      <p-model-signature [model]="'cayman'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model cayman on dark background">
      <p-model-signature [model]="'cayman'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model macan on light background">
      <p-model-signature [model]="'macan'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model macan on dark background">
      <p-model-signature [model]="'macan'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model panamera on light background">
      <p-model-signature [model]="'panamera'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model panamera on dark background">
      <p-model-signature [model]="'panamera'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model taycan on light background">
      <p-model-signature [model]="'taycan'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model taycan on dark background">
      <p-model-signature [model]="'taycan'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model turbo on light background">
      <p-model-signature [model]="'turbo'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for model turbo on dark background">
      <p-model-signature [model]="'turbo'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color primary on light background">
      <p-model-signature [model]="'911'" [color]="'primary'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for color primary on dark background">
      <p-model-signature [model]="'911'" [color]="'primary'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-low on light background">
      <p-model-signature [model]="'911'" [color]="'contrast-low'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for color contrast-low on dark background">
      <p-model-signature [model]="'911'" [color]="'contrast-low'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-medium on light background">
      <p-model-signature [model]="'911'" [color]="'contrast-medium'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for color contrast-medium on dark background">
      <p-model-signature [model]="'911'" [color]="'contrast-medium'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-high on light background">
      <p-model-signature [model]="'911'" [color]="'contrast-high'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for color contrast-high on dark background">
      <p-model-signature [model]="'911'" [color]="'contrast-high'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color inherit on light background">
      <p-model-signature
        [model]="'911'"
        [color]="'inherit'"
        style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"
      ></p-model-signature>
    </div>
    <div class="playground dark" title="should render for color inherit on dark background">
      <p-model-signature
        [model]="'911'"
        [color]="'inherit'"
        style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"
        [theme]="'dark'"
      ></p-model-signature>
    </div>

    <div class="playground light" title="should render for size small on light background">
      <p-model-signature [model]="'911'" [size]="'small'"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for size small on dark background">
      <p-model-signature [model]="'911'" [size]="'small'" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for size inherit on light background">
      <p-model-signature [model]="'911'" [size]="'inherit'" style="height: 100px"></p-model-signature>
    </div>
    <div class="playground dark" title="should render for size inherit on dark background">
      <p-model-signature [model]="'911'" [size]="'inherit'" style="height: 100px" [theme]="'dark'"></p-model-signature>
    </div>

    <div class="playground light" title="should not exceed parents width">
      <div style="width: 180px; background: lightsalmon">
        <p-model-signature [model]="'panamera'"></p-model-signature>
      </div>
      <br />
      <div style="width: 180px; background: lightsalmon">
        <p-model-signature [model]="'panamera'" [size]="'inherit'" style="height: 80px"></p-model-signature>
      </div>
    </div>

    <div class="playground light" title="should not exceed parents height">
      <div style="height: 10px; background: lightsalmon">
        <p-model-signature [model]="'panamera'"></p-model-signature>
      </div>
      <br />
      <div style="height: 10px; background: lightsalmon">
        <p-model-signature [model]="'panamera'" [size]="'inherit'" style="height: 80px"></p-model-signature>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelSignatureComponent {}
