import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-textarea name="some-name" state="error">
        <span slot="label" id="some-label-id">
          Some label with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
           and a "label-after" slot.
        </span>
        <p-popover slot="label-after">
          Some Popover content with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </p-popover>
        <span slot="description" id="some-description-id">
          Some description with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </span>
        <span slot="message" id="some-message-id">
          Some error message with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </span>
      </p-textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
