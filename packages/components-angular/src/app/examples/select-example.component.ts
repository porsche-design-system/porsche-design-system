import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-select name="options" label="Some Label">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
        <p-select-option value="c">Option C</p-select-option>
        <p-select-option value="d">Option D</p-select-option>
        <p-select-option value="e">Option E</p-select-option>
        <p-select-option value="f">Option F</p-select-option>
      </p-select>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SelectExampleComponent {
  lastSubmittedData: string = 'none';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('options')?.toString() || 'none';
  }
}
