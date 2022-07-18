import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { SegmentedControlChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'segmented-control-example',
  template: `
    <p-segmented-control [value]="currentValue" (segmentedControlChange)="onSegmentedControlChange($event)">
      <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
      <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
      <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
      <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
      <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
    </p-segmented-control>

    <p-text>Current value: {{ currentValue }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlExample {
  currentValue = 1;

  onSegmentedControlChange(e: CustomEvent<SegmentedControlChangeEvent>) {
    this.currentValue = e.detail.value as number;
  }
}
