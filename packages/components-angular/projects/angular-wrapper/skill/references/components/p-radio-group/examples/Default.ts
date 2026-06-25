import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-radio-group name="options" label="Some Label" description="Some description">
        <p-radio-group-option value="a" label="Option A"></p-radio-group-option>
        <p-radio-group-option value="b" label="Option B"></p-radio-group-option>
        <p-radio-group-option value="c" label="Option C"></p-radio-group-option>
        <p-radio-group-option value="d" label="Option D"></p-radio-group-option>
        <p-radio-group-option value="e" label="Option E"></p-radio-group-option>
        <p-radio-group-option value="f" label="Option F"></p-radio-group-option>
      </p-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
