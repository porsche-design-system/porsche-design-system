import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type InputTextInputEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-text-example-controlled',
  template: `
    <p-input-text name="some-name" label="Some Label" [value]="value" (input)="onInput($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputTextExampleControlledComponent {
  value: string = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onInput(e: CustomEvent<InputTextInputEventDetail>) {
    const target = e.target as HTMLElement & { value: string };

    if (target.value.length > 3) {
      const newValue = target.value.slice(0, 3);
      this.value = newValue;
      // The web component doesn't prevent native input, so we must manually reset the input element's value.
      // Angular won't re-render since setState with the truncated value doesn't trigger a change when it's already set.
      target.value = newValue;
    }
  }
}
