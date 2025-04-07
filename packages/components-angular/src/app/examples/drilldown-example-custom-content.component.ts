import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type DrilldownUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-drilldown-example-custom-content',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      p-link-tile {
        margin-bottom: $pds-spacing-fluid-small;
      }

      p-link-pure {
        margin: 0 calc(#{$pds-spacing-fluid-small} * -1);
        padding: $pds-spacing-fluid-small;
      }
    `,
  ],
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
          <p-link-tile
            href="#"
            label="Some label"
            description="Some Description"
            weight="semi-bold"
            [compact]="true"
            [aspectRatio]="{ base: '4/3', xs: '16/9', s: '1/1' }"
          >
            <img
              srcset="http://localhost:3002/porsche-963@2x.webp 2x"
              src="http://localhost:3002/porsche-963.webp"
              width="636"
              height="847"
              alt="Porsche 963"
            />
          </p-link-tile>
          <a href="#">Some anchor</a>
          <a href="#" aria-current="page">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-2" label="Some Label">
          <p-drilldown-item identifier="id-2-1" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </p-drilldown-item>
          <p-drilldown-item identifier="id-2-2" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </p-drilldown-item>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
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
        <p-link-pure size="medium" href="#" icon="external">Some external anchor</p-link-pure>
      </p-drilldown>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DrilldownExampleCustomContentComponent {
  isDrilldownOpen = false;
  drilldownActiveIdentifier: string | undefined = 'id-1';

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
