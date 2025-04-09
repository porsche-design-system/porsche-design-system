import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type TextareaInputEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-password-example-controlled',
  template: `
    <p-input-password name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputPasswordExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<TextareaInputEventDetail>) {
    this.value = (e.detail.target as HTMLTextAreaElement).value;
  }
}
