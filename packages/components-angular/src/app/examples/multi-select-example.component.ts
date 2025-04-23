import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-multi-select name="options" label="Some Label" [value]="['a']">
        <p-multi-select-option value="a">Option A</p-multi-select-option>
        <p-multi-select-option value="b">Option B</p-multi-select-option>
        <p-multi-select-option value="c">Option C</p-multi-select-option>
        <p-multi-select-option value="d">Option D</p-multi-select-option>
        <p-multi-select-option value="e">Option E</p-multi-select-option>
        <p-multi-select-option value="f">Option F</p-multi-select-option>
      </p-multi-select>
      <p-button type="submit">Submit</p-button>
      <p-button type="reset">Reset</p-button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class MultiSelectExampleComponent {
  lastSubmittedData: string = 'none';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = Array.from(formData.getAll('options')).join(', ') || 'none';
  }
}
