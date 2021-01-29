import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-core-initializer',
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
export class CoreInitializerComponent implements OnInit {
  public isEnabled = false;

  public ngOnInit() {
    setTimeout(() => (this.isEnabled = true), 1000);
  }
}
