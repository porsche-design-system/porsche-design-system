import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="flex w-full max-w-md flex-col gap-static-xs self-start [&>p-input-search]:min-w-0">
        <p-input-search label="Search" name="aria-sketch" [indicator]="true" [clear]="true" [aria]="{'role': 'combobox', 'aria-expanded': 'true', 'aria-haspopup': 'listbox', 'aria-autocomplete': 'list', 'aria-controls': 'listbox'}"></p-input-search>
        <div id="listbox" role="listbox" [tabIndex]="0" aria-label="Search options" class="max-h-48 p-static-sm overflow-y-auto rounded-xl border-thin border-contrast-lower bg-background-base shadow-md ">
          <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            718
          </div>
          <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            911
          </div>
          <div role="option" aria-selected="true" class="flex px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            <span>
              Cayenne
            </span>
            <p-icon name="check" color="primary" [aria-hidden]="true" class="ms-auto"></p-icon>
          </div>
          <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            Macan
          </div>
          <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            Panamera
          </div>
          <div role="option" aria-selected="false" class="px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm">
            Taycan
          </div>
        </div>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
