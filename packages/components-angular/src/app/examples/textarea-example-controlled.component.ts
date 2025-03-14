import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type TextareaInputEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-textarea-example-controlled',
  template: `
    <p-textarea name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TextareaExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<TextareaInputEventDetail>) {
    this.value = (e.detail.target as HTMLTextAreaElement).value;
  }
}
