import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-scroller class="max-w-[600px] whitespace-nowrap">
        <p-tag class="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="notification-warning-soft">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="notification-warning-soft">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag class="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
        <p-tag color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </p-tag>
      </p-scroller>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
