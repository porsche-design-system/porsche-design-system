import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type DrilldownUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-drilldown-example-active-identifier',
  template: `
    <nav aria-label="Main">
      <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Drilldown</p-button>
      <p-drilldown
        [open]="isDrilldownOpen"
        [activeIdentifier]="drilldownActiveIdentifier"
        (dismiss)="onDismiss()"
        (update)="onUpdate($event)"
      >
        <p-drilldown-item identifier="id-1" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-2" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#" aria-current="page">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-3" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-4" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-5" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
      </p-drilldown>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DrilldownExampleActiveIdentifierComponent {
  isDrilldownOpen = false;
  drilldownActiveIdentifier: string | undefined = 'id-2';

  onOpen(): void {
    this.isDrilldownOpen = true;
  }
  onDismiss(): void {
    this.isDrilldownOpen = false;
  }
  onUpdate(e: CustomEvent<DrilldownUpdateEventDetail>): void {
    this.drilldownActiveIdentifier = e.detail.activeIdentifier;
  }
}
