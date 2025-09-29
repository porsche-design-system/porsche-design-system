import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-radio-group-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-radio-group name="options" label="Some Label">
        <p-radio-group-option label="Option A" value="a"></p-radio-group-option>
        <p-radio-group-option label="Option B" value="b"></p-radio-group-option>
        <p-radio-group-option label="Option C" value="c"></p-radio-group-option>
        <p-radio-group-option label="Option D" value="d"></p-radio-group-option>
        <p-radio-group-option label="Option E" value="e"></p-radio-group-option>
        <p-radio-group-option label="Option F" value="f"></p-radio-group-option>
      </p-radio-group>
      <p-button type="submit">Submit</p-button>
      <p-button type="reset">Reset</p-button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class RadioGroupExampleComponent {
  lastSubmittedData: string = 'none';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('options')?.toString() || 'none';
  }
}
