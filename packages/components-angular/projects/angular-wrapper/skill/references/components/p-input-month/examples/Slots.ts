import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-input-month state="error">
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
        <p-icon slot="start" name="shopping-cart" color="contrast-medium" [aria-hidden]="true"></p-icon>
        <p-button-pure slot="end" icon="delete" [hideLabel]="true" class="p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)" [aria]="{'aria-label': 'Delete'}"></p-button-pure>
        <span slot="message" id="some-message-id">
          Some error message with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </span>
      </p-input-month>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
