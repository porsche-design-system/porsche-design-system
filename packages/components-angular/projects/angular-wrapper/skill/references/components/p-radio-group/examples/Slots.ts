import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-radio-group state="error" value="a">
        <span slot="label">
          Some slotted label with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
           text and a "label-after" slot.
        </span>
        <p-popover slot="label-after">
          Some Popover description
        </p-popover>
        <span slot="description">
          Some slotted description with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </span>
        <span slot="message">
          Some slotted error message with a 
          <a href="https://designsystem.porsche.com" class="underline">
            link
          </a>
          .
        </span>
        <p-radio-group-option value="a">
          <span slot="label">
            <img src="assets/911.png" alt="" class="object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]" />
            Some slotted label with custom content and a "label-after" slot
          </span>
          <p-popover slot="label-after">
            Option A with slotted label and a popover 
          </p-popover>
        </p-radio-group-option>
        <p-radio-group-option value="b">
          <span slot="label">
            Option B with slotted label
          </span>
        </p-radio-group-option>
        <p-radio-group-option value="c" disabled="true">
          <span slot="label">
            Disabled Option C with slotted label, a nested 
            <a href="https://www.porsche.com" class="underline">
              link
            </a>
             and a label-after slot.
          </span>
          <p-popover slot="label-after">
            Some information about the disabled state.
          </p-popover>
        </p-radio-group-option>
        <p-radio-group-option value="d">
          <span slot="label">
            Option C with slotted label and a nested 
            <a href="https://www.porsche.com" class="underline">
              link
            </a>
          </span>
        </p-radio-group-option>
      </p-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
