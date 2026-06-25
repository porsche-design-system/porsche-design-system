import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-select name="options" label="Some Label" description="Some description">
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
      </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
