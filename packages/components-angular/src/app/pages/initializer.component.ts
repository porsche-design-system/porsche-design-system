import { Component } from '@angular/core';

@Component({
  selector: 'page-initializer',
  template: `
    <div class="playground light">
      <p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </p-text-field-wrapper>

      <p-text-field-wrapper *ngIf="isEnabled" [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>
  `,
})
export class InitializerComponent {
  public isEnabled = false;

  public ngOnInit() {
    setTimeout(() => {
      this.isEnabled = true;
    }, 1000);
  }
}
