import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="718"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="911"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="boxster"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="cayenne"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="cayman"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="gt3-rs"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="gt3"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="gts"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="macan"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="panamera"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="taycan"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="turbo-s"></p-model-signature>
      </div>

      <div class="bg-[#ff000033] inline-block me-static-md mt-static-md">
        <p-model-signature [safeZone]="false" model="turbo"></p-model-signature>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
