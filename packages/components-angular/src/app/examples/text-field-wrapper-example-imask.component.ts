import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { IMaskModule } from 'angular-imask';
import { MaskedRange } from 'imask';

@Component({
  selector: 'page-text-field-wrapper-example-imask',
  template: `
    <p-text-field-wrapper [label]="'Some label'" [description]="description">
      <input [type]="'text'" [imask]="mask" />
    </p-text-field-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, IMaskModule],
})
export class TextFieldWrapperExampleImaskComponent {
  public isDeLocale = Intl.NumberFormat().resolvedOptions().locale.startsWith('de');
  public dateFormat = this.isDeLocale ? 'dd.mm.yyyy' : 'mm/dd/yyyy';
  public dateRange = this.isDeLocale ? '01.01.1900, 01.01.2100' : '01/01/1900, 01/01/2100';
  public description = `'${this.dateFormat}' in range [${this.dateRange}]`;
  public mask = {
    lazy: false,
    mask: this.dateFormat,
    blocks: {
      dd: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'd',
      },
      mm: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'm',
      },
      yyyy: {
        mask: MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'y',
      },
    },
  };
}
