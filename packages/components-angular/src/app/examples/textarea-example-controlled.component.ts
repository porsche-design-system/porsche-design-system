import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextareaInputEventDetail } from '@porsche-design-system/components';

@Component({
  selector: 'page-textarea-example-controlled',
  template: `
    <p-textarea name="name" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<TextareaInputEventDetail>) {
    this.value = (e.target as HTMLTextAreaElement).value;
  }
}
