import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type CheckboxUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example-controlled',
  template: `
    <p-checkbox
      name="some-name"
      label="Some Label"
      value="some-value"
      [checked]="state['some-name']"
      (update)="onUpdate($event)"
    />
    <p-text>some-name: {{ state['some-name'] ? 'checked' : 'not checked' }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleControlledComponent {
  state = {
    'some-name': true,
  };

  onUpdate({ detail: { name, checked } }: CustomEvent<CheckboxUpdateEventDetail>) {
    this.state[name] = checked;
  }
}
