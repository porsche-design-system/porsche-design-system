import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  template: `
    <p-headline [variant]="'headline-2'">Feedback</p-headline>
    <hr>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-spinner&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground light spacing-inline">
          <p-spinner [size]="'small'"></p-spinner>
          <p-spinner [size]="'medium'"></p-spinner>
          <p-spinner [size]="'large'"></p-spinner>
          <p-spinner [size]="'inherit'" style="width: 24px;"></p-spinner>
        </div>
        <hr>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground dark spacing-inline">
          <p-spinner [theme]="'dark'" [size]="'small'"></p-spinner>
          <p-spinner [theme]="'dark'" [size]="'medium'"></p-spinner>
          <p-spinner [theme]="'dark'" [size]="'large'"></p-spinner>
          <p-spinner [theme]="'dark'" [size]="'inherit'" style="width: 24px;"></p-spinner>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
  `
})
export class FeedbackComponent {

}
