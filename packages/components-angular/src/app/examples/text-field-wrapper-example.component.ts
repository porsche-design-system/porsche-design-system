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
  public isUsLocale = (yourDetectedLocale?: string) => yourDetectedLocale === 'en-US' || false;
  public description = `'${this.isUsLocale() ? 'mm/dd/yyyy' : 'dd.mm.yyyy'}' in range [${
    this.isUsLocale() ? '01/01/1900, 01/01/2100' : '01.01.1900, 01.01.2100'
  }]`;
  public mask = {
    lazy: false,
    mask: this.isUsLocale() ? 'mm/dd/yyyy' : 'dd.mm.yyyy',
    blocks: {
      yyyy: {
        mask: MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'y',
      },
      mm: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'm',
      },
      dd: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'd',
      },
    },
  };
}
