import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type InputTelInputEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-tel-example-controlled',
  template: `
    <p-input-tel name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputTelExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<InputTelInputEventDetail>) {
    this.value = (e.detail.target as HTMLInputElement).value;
  }
}
