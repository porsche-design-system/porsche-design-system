/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-model-signature',
  template: `
    <div class="playground light" title="should render for model 718">
      <p-model-signature [model]="'718'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model 911">
      <p-model-signature [model]="'911'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model boxster">
      <p-model-signature [model]="'boxster'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model cayenne">
      <p-model-signature [model]="'cayenne'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model cayman">
      <p-model-signature [model]="'cayman'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model macan">
      <p-model-signature [model]="'macan'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model panamera">
      <p-model-signature [model]="'panamera'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model taycan">
      <p-model-signature [model]="'taycan'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for model turbo">
      <p-model-signature [model]="'turbo'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color primary">
      <p-model-signature [model]="'911'" [color]="'primary'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-low">
      <p-model-signature [model]="'911'" [color]="'contrast-low'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-medium">
      <p-model-signature [model]="'911'" [color]="'contrast-medium'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color contrast-high">
      <p-model-signature [model]="'911'" [color]="'contrast-high'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for color inherit">
      <p-model-signature
        [model]="'911'"
        [color]="'inherit'"
        style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"
      ></p-model-signature>
    </div>

    <div class="playground light" title="should render for size small">
      <p-model-signature [model]="'911'" [size]="'small'"></p-model-signature>
    </div>

    <div class="playground light" title="should render for size inherit">
      <p-model-signature [model]="'911'" [size]="'inherit'" style="height: 100px"></p-model-signature>
    </div>

    <div class="playground light" title="should not exceed parents width">
      <div style="width: 180px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" style="background: lightblue"></p-model-signature>
      </div>
      <br />
      <div style="width: 180px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" [size]="'inherit'" style="background: lightblue; height: 40px"></p-model-signature>
      </div>
    </div>

    <div
      class="playground light"
      title="should not exceed max-width of model-signature itself, although parent provides more width"
    >
      <div style="width: 272px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" style="background: lightblue"></p-model-signature>
      </div>
      <br />
      <div style="width: 272px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" [size]="'inherit'" style="background: lightblue; height: 40px"></p-model-signature>
      </div>
    </div>

    <div class="playground light" title="should not exceed parents height">
      <div style="height: 10px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" style="background: lightblue"></p-model-signature>
      </div>
      <br />
      <div style="height: 10px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" [size]="'inherit'" style="background: lightblue; height: 40px"></p-model-signature>
      </div>
    </div>

    <div
      class="playground light"
      title="should not exceed max-height of model-signature itself, although parent provides more height"
    >
      <div style="height: 100px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" style="background: lightblue"></p-model-signature>
      </div>
      <br />
      <div style="height: 100px; background: lightsalmon">
        <p-model-signature [model]="'cayenne'" [size]="'inherit'" style="background: lightblue; height: 40px"></p-model-signature>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelSignatureComponent {}
