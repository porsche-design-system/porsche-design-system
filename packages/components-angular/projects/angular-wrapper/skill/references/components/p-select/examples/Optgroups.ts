import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-select name="options" label="Some Label" description="Some description">
        <p-optgroup label="Some optgroup label 1">
          <p-select-option value="a">
            Option A
          </p-select-option>
          <p-select-option value="b">
            Option B
          </p-select-option>
          <p-select-option value="c">
            Option C
          </p-select-option>
          <p-select-option value="d">
            Option D
          </p-select-option>
          <p-select-option value="e">
            Option E
          </p-select-option>
          <p-select-option value="f">
            Option F
          </p-select-option>
        </p-optgroup>
        <p-optgroup label="Some optgroup label 2">
          <p-select-option value="g">
            Option G
          </p-select-option>
          <p-select-option value="h">
            Option H
          </p-select-option>
          <p-select-option value="i">
            Option I
          </p-select-option>
        </p-optgroup>
      </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
