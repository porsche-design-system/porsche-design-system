import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-multi-select-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-multi-select name="options" label="Some Label">
        <p-multi-select-option value="a">Option A</p-multi-select-option>
        <p-multi-select-option value="b">Option B</p-multi-select-option>
        <p-multi-select-option value="c">Option C</p-multi-select-option>
        <p-multi-select-option value="d">Option D</p-multi-select-option>
        <p-multi-select-option value="e">Option E</p-multi-select-option>
        <p-multi-select-option value="f">Option F</p-multi-select-option>
      </p-multi-select>
      <button type="submit">Submit</button>
    </form>

    <p>Last submitted data: {{ lastSubmittedData }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectExampleComponent {
  lastSubmittedData: string = 'none';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = Array.from(formData.values()).join(', ') || 'none';
  }
}
