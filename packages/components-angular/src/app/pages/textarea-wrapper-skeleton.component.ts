/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-textarea-wrapper-skeleton',
  template: `
    <div class="playground light" title="should render textarea skeleton with label">
      <p-textarea-wrapper [label]="'Label'">
        <textarea></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render textarea skeleton with description">
      <p-textarea-wrapper [description]="'Some description'">
        <textarea></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render textarea skeleton with label, description and placeholder">
      <p-textarea-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'">
        <textarea [placeholder]="'Some placeholder'"></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render textarea skeleton without label and without description">
      <p-textarea-wrapper [label]="'Label'" [description]="'Some description'" [hideLabel]="true">
        <textarea>Without label and description</textarea>
      </p-textarea-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-textarea-wrapper').forEach((textarea) => {
        textarea.classList.remove('hydrated');
      });
    });
  }
}
