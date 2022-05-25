import { Component } from '@angular/core';
import { MaskedRange } from 'imask';

@Component({
  selector: 'text-field-wrapper-example',
  template: `
    <p-text-field-wrapper [label]="'Some label'" [description]="description">
      <input [type]="'text'" [imask]="mask" />
    </p-text-field-wrapper>
  `,
})
export class TextFieldWrapperExampleComponent {
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
