import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type TextareaInputEventDetail } from '@porsche-design-system/components-angular';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-search-example-controlled',
  template: `
    <p-input-search name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputSearchExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<TextareaInputEventDetail>) {
    this.value = (e.detail.target as HTMLTextAreaElement).value;
  }
}
