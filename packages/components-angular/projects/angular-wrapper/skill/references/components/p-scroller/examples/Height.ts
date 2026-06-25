import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-scroller class="max-w-[600px] whitespace-nowrap">
        <p-tag-dismissible class="me-static-md">
          Some tag content
        </p-tag-dismissible>
        <p-tag-dismissible class="me-static-md">
          Some tag content
        </p-tag-dismissible>
        <p-tag-dismissible class="me-static-md">
          Some tag content
        </p-tag-dismissible>
        <p-tag-dismissible class="me-static-md">
          Some tag content
        </p-tag-dismissible>
        <p-tag-dismissible class="me-static-md">
          Some tag content
        </p-tag-dismissible>
      </p-scroller>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
