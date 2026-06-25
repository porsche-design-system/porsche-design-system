import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-select name="options" label="Some Label" description="Some description">
        <p-select-option value="718">
          <img src="assets/718.png" />
          718
        </p-select-option>
        <p-select-option value="911">
          <img src="assets/911.png" />
          911
        </p-select-option>
        <p-select-option value="taycan">
          <img src="assets/taycan.png" />
          taycan
        </p-select-option>
        <p-select-option value="macan">
          <img src="assets/macan.png" />
          macan
        </p-select-option>
        <p-select-option value="cayenne">
          <img src="assets/cayenne.png" />
          cayenne
        </p-select-option>
        <p-select-option value="panamera">
          <img src="assets/panamera.png" />
          panamera
        </p-select-option>
      </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
