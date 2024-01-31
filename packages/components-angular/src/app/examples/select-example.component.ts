import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-select-example',
  template: `
    <form (submit)="handleSubmit($event)">
      <p-select name="options" label="Some Label">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
        <p-select-option value="c">Option C</p-select-option>
        <p-select-option value="d">Option D</p-select-option>
        <p-select-option value="e">Option E</p-select-option>
        <p-select-option value="f">Option F</p-select-option>
      </p-select>
      <button type="submit">Submit</button>
    </form>

    <p>Last submitted data: {{ lastSubmittedData }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectExampleComponent {
  lastSubmittedData: string = 'none';

  handleSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('options')?.toString() || 'none';
  }
}
