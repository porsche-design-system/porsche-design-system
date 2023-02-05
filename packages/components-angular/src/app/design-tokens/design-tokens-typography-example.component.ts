import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-typography-example',
  styleUrls: ['./design-tokens-typography-example.component.scss'],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Display</h3>
        <h3 class="display-large typography">The quick brown fox jumps over the lazy dog</h3>
        <h3 class="display-medium typography">The quick brown fox jumps over the lazy dog</h3>
      </div>
      <div class="wrapper">
        <h3 class="heading">Heading</h3>
        <h6 class="heading-xxx-large typography">The quick brown fox jumps over the lazy dog</h6>
        <h6 class="heading-xx-large typography">The quick brown fox jumps over the lazy dog</h6>
        <h6 class="heading-x-large typography">The quick brown fox jumps over the lazy dog</h6>
        <h6 class="heading-large typography">The quick brown fox jumps over the lazy dog</h6>
        <h6 class="heading-medium typography">The quick brown fox jumps over the lazy dog</h6>
        <h6 class="heading-small typography">The quick brown fox jumps over the lazy dog</h6>
      </div>
      <div class="wrapper">
        <h3 class="heading">Text</h3>
        <p class="text-x-large typography">The quick brown fox jumps over the lazy dog</p>
        <p class="text-large typography">The quick brown fox jumps over the lazy dog</p>
        <p class="text-medium typography">The quick brown fox jumps over the lazy dog</p>
        <p class="text-small typography">The quick brown fox jumps over the lazy dog</p>
        <p class="text-x-small typography">The quick brown fox jumps over the lazy dog</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensTypographyExampleComponent {}
