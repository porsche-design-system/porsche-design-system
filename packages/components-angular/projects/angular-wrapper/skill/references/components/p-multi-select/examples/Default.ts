import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-multi-select name="name" label="Some Label" description="Some description">
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
      </p-multi-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
