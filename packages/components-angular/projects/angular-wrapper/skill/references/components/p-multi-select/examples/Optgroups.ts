import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-multi-select name="options" label="Some Label">
        <p-optgroup label="Some optgroup label 1">
          <p-multi-select-option value="a">
            Option A
          </p-multi-select-option>
          <p-multi-select-option value="b">
            Option B
          </p-multi-select-option>
          <p-multi-select-option value="c">
            Option C
          </p-multi-select-option>
          <p-multi-select-option value="d">
            Option D
          </p-multi-select-option>
          <p-multi-select-option value="e">
            Option E
          </p-multi-select-option>
          <p-multi-select-option value="f">
            Option F
          </p-multi-select-option>
        </p-optgroup>
        <p-optgroup label="Some optgroup label 2">
          <p-multi-select-option value="g">
            Option G
          </p-multi-select-option>
          <p-multi-select-option value="h">
            Option H
          </p-multi-select-option>
          <p-multi-select-option value="i">
            Option I
          </p-multi-select-option>
        </p-optgroup>
      </p-multi-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
