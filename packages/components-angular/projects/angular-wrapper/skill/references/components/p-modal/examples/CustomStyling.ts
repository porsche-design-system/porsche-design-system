import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" [aria]="{'aria-haspopup': 'dialog'}" (click)="onClick()">
        Open Modal
      </p-button>

      <p-modal [open]="open" backdrop="shading" [aria]="{'aria-label': 'Some Label'}" class="[--p-modal-width:clamp(276px,45.25vw+131px,1000px)] [--p-modal-spacing-top:200px] [--p-modal-spacing-bottom:50px]" (dismiss)="onDismiss()">
        <img src="assets/porsche-992-carrera-s.jpg" class="-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb) max-w-(--p-modal-width) rounded-xl" />
      </p-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  open = false;

  onClick() {
    this.open = true;
  }
  onDismiss() {
    this.open = false;
  }
}
