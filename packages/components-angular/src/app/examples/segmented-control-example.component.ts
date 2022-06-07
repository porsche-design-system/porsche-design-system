import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { SegmentedControlChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-segmented-control-example',
  template: `
    <p-segmented-control (segmentedControlChange)="onSegmentedControlChange($event)">
      <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
      <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
      <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
      <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
      <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
    </p-segmented-control>

    <p>Current value: {{ currentValue }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlExampleComponent {
  currentValue: string | number;

  onSegmentedControlChange(e: CustomEvent<SegmentedControlChangeEvent>) {
    this.currentValue = e.detail.value;
  }
}
