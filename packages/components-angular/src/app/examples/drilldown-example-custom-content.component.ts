import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type DrilldownUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-drilldown-example-custom-content',
  styles: [
    `
      @use '@porsche-design-system/components-angular/scss' as *;

      p-drilldown {
        --p-drilldown-grid-template: repeat(5, auto) minmax(0, 1fr) / auto
      }

      p-drilldown > p-drilldown-item:first-of-type {
        --p-drilldown-grid-template: auto / repeat(2, minmax(0, 1fr));
        --p-drilldown-gap: 0px 16px
      }

      p-button-tile {
        margin-bottom: $pds-spacing-fluid-small;
      }

      p-link {
        align-self: end
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
        <p-drilldown-item identifier="id-1" label="Motorsport">
          <p-drilldown-item identifier="id-1-1" label="718">
            <p-model-signature slot="header" model="718"></p-model-signature>
            <p-button-tile
              slot="button"
              label="Some label"
              description="718"
              weight="semi-bold"
              [compact]="true"
              [aspectRatio]="{ base: '1/1', s: '9/16' }"
            >
              <img
                srcset="http://localhost:3002/porsche-963@2x.webp 2x"
                src="http://localhost:3002/porsche-963.webp"
                width="636"
                height="847"
                alt="Porsche 963"
              />
            </p-button-tile>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          </p-drilldown-item>
          <p-drilldown-item identifier="id-1-2" label="911">
            <p-model-signature slot="header" model="911"></p-model-signature>
            <p-button-tile
              slot="button"
              label="Some label"
              description="911"
              weight="semi-bold"
              [compact]="true"
              [aspectRatio]="{ base: '1/1', s: '9/16' }"
            >
              <img
                srcset="http://localhost:3002/porsche-963@2x.webp 2x"
                src="http://localhost:3002/porsche-963.webp"
                width="636"
                height="847"
                alt="Porsche 963"
              />
            </p-button-tile>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          </p-drilldown-item>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#" [active]="true">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-2" label="Some Label">
          <p-drilldown-item identifier="id-2-1" label="Some Label">
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          </p-drilldown-item>
          <p-drilldown-item identifier="id-2-2" label="Some Label">
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
            <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          </p-drilldown-item>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-3" label="Some Label">
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-4" label="Some Label">
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
        </p-drilldown-item>
        <p-drilldown-item identifier="id-5" label="Some Label">
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
          <p-drilldown-link href="#">Some anchor</p-drilldown-link>
        </p-drilldown-item>
        <p-link href="#" icon="external" variant="secondary">Some external anchor</p-link>
      </p-drilldown>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
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
