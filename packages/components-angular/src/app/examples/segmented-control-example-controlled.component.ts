import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PorscheDesignSystemModule,
  SegmentedControlChangeEventDetail,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-segmented-control-example-controlled',
  template: `
    <p-segmented-control [value]="currentValue" (change)="onChange($event)">
      <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
      <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
      <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
      <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
      <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
    </p-segmented-control>

    <p-text>Current value: {{ currentValue }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SegmentedControlExampleControlledComponent {
  currentValue = 1;

  onChange(e: CustomEvent<SegmentedControlChangeEventDetail>) {
    this.currentValue = e.detail.value as number;
  }
}
