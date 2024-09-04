import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type CheckboxUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example-controlled',
  template: `
    <p-checkbox name="some-name" label="Some Label" [checked]="true" [value]="value" (update)="onUpdate($event)" />
    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleControlledComponent {
  value: string = 'some-value';
  get debugText(): string {
    return `Value: ${this.value}`;
  }

  onUpdate(e: CustomEvent<CheckboxUpdateEventDetail>) {
    this.value = e.detail.checked ? e.detail.value : undefined;
  }
}
