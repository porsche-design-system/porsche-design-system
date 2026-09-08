import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-core-initializer-prefixed',
  template: `
    <div class="playground light">
      <p-input-text name="input-text" [label]="'Some Label'" [description]="'Some Description'" />

      <my-prefix-p-input-text [label]="'Some Label'" [description]="'Some Description'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CoreInitializerPrefixedComponent {}
