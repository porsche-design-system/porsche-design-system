import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-focus-example',
  styleUrls: ['./design-tokens-focus-example.component.scss'],
  template: `
    <div>
      <div class="wrapper wrapper--light">
        <h3 class="heading heading--light">Focus Light (only visible by keyboard navigation)</h3>
        <button class="native-button native-button--light">Some Button</button>
        <a href="#" class="native-anchor native-anchor--light">Some Anchor</a>
      </div>
      <div class="wrapper wrapper--dark">
        <h3 class="heading heading--dark">Focus Dark (only visible by keyboard navigation)</h3>
        <button class="native-button native-button--dark">Some Button</button>
        <a href="#" class="native-anchor native-anchor--dark">Some Anchor</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensFocusExampleComponent {}
