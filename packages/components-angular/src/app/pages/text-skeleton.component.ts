/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-text-skeleton',
  template: `
    <div class="playground light" title="should show text skeleton in different sizes">
      <p-text [size]="'x-small'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text>The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'medium'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'large'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'x-large'">The quick brown fox jumps over the lazy dog</p-text>
    </div>

    <div class="playground dark" title="should show text skeleton in different sizes on dark theme">
      <p-text [theme]="'dark'" [size]="'x-small'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'" [size]="'medium'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'" [size]="'large'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'" [size]="'x-large'">The quick brown fox jumps over the lazy dog</p-text>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-text').forEach((text) => {
        text.classList.remove('hydrated');
      });
    });
  }
}
