import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type CheckboxUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example-controlled',
  template: `
    <p-checkbox name="some-name" label="Some Label" value="some-value" (update)="onUpdate($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleControlledComponent {
  value: string | undefined = '';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onUpdate(e: CustomEvent<CheckboxUpdateEventDetail>) {
    this.value = e.detail.checked ? e.detail.value : '';
  }
}
