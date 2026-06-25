import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-text-list>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
        </p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog
            </p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
        </p-text-list-item>
      </p-text-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
