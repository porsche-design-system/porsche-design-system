import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-boolean-attribute-shorthand-example',
  template: `
    <p-input-text id="shorthand" name="shorthand" label="Some label" hide-label></p-input-text>
    <p-input-text id="explicit-true" name="explicit-true" label="Some label" [hideLabel]="true"></p-input-text>
    <p-input-text id="explicit-false" name="explicit-false" label="Some label" [hideLabel]="false"></p-input-text>
    <p-input-text id="omitted" name="omitted" label="Some label"></p-input-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class BooleanAttributeShorthandExampleComponent {}
