import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="flex items-start w-64 border-2 border-contrast-lower rounded-md hover:border-primary transition-colors">
        <label class="inline-flex flex-col p-fluid-xs gap-static-xs prose-text-sm cursor-pointer hover:[--p-checkbox-border-color:var(--color-primary)]" (click)="onClick()">
          <span>
            Some wrapped custom label besides a popover
          </span>
          <p-checkbox [checked]="false"></p-checkbox>
        </label>
        <p-popover class="mr-static-xs mt-static-xs">
          Some additional content.
        </p-popover>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  onClick() {
    this.checked = true;
  }
}
