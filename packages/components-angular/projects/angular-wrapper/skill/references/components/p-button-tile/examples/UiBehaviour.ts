import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="grid grid-cols-2 gap-static-md">
        <p-button-tile aspectRatio="4/3" label="Some Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum." size="large">
          <p-tag slot="header" color="background-frosted" compact="true">
            4/3
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </p-button-tile>
        <p-button-tile aspectRatio="4/3" label="Some Label" description="Some description">
          <p-tag slot="header" color="background-frosted" compact="true">
            4/3
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </p-button-tile>
        <p-button-tile aspectRatio="1/1" label="Some Label" description="Some description">
          <p-tag slot="header" color="background-frosted" compact="true">
            1/1
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </p-button-tile>
        <p-button-tile aspectRatio="9/16" label="Some Label" description="Some description">
          <p-tag slot="header" color="background-frosted" compact="true">
            9/16
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </p-button-tile>
        <p-button-tile aspectRatio="1/1" label="Some Label" description="Some description">
          <p-tag slot="header" color="background-frosted" compact="true">
            1/1
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </p-button-tile>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
