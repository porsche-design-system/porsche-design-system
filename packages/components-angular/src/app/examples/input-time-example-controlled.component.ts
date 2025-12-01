import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type InputTimeInputEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-time-example-controlled',
  template: `
    <p-input-time name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputTimeExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<InputTimeInputEventDetail>) {
    this.value = (e.detail.target as HTMLInputElement).value;
  }
}
