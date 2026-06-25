import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-heading size="small" tag="h3">
        Pick your favorite Fruits
      </p-heading>

      <p-radio-group label="Some Label" name="fruit" value="banana" class="mt-static-sm">
        <p-radio-group-option value="banana">
          <span slot="label">
            Banana
            <p-ai-tag variant="generated" class="ms-static-sm"></p-ai-tag>
          </span>
        </p-radio-group-option>
        <p-radio-group-option value="apple" label="Apple"></p-radio-group-option>
        <p-radio-group-option value="melon">
          <span slot="label">
            Melon
            <p-ai-tag variant="abbreviation" class="ms-static-sm"></p-ai-tag>
          </span>
        </p-radio-group-option>
        <p-radio-group-option value="grapefruit" label="Grapefruit"></p-radio-group-option>
      </p-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
