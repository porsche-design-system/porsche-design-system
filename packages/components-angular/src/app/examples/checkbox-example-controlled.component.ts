import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type CheckboxUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

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
    <p-text>some-name: {{ state['some-name'] }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class CheckboxExampleControlledComponent {
  state: { [key: string]: boolean } = {
    'some-name': true,
  };

  onUpdate({ detail: { name, checked } }: CustomEvent<CheckboxUpdateEventDetail>) {
    this.state[name] = checked;
  }
}
