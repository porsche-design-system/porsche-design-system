import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type CheckboxChangeEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example-controlled',
  template: `
    <p-checkbox
      name="some-name"
      label="Some Label"
      value="some-value"
      [checked]="state['some-name']"
      (change)="onChange($event)"
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

  onChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    const { name, checked } = event.target as HTMLInputElement;
    this.state[name] = checked;
  }
}
