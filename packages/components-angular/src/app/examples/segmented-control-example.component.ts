import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-segmented-control-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-segmented-control name="options">
        <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
        <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
        <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
        <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
        <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
      </p-segmented-control>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SegmentedControlExampleComponent {
  lastSubmittedData: string = 'none';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('options').toString() || 'none';
  }
}
