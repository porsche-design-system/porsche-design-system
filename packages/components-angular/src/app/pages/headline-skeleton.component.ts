/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-headline-skeleton',
  template: `
    <div class="playground light" title="should show skeleton headlines with different style variants">
      <p-headline [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-1'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-2'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-3'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-4'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-5'">The quick brown fox jumps over the lazy dog</p-headline>
    </div>

    <div class="playground dark" title="should show skeleton headlines with different style variants on dark background">
      <p-headline [theme]="'dark'" [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [theme]="'dark'" [variant]="'headline-1'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [theme]="'dark'" [variant]="'headline-2'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [theme]="'dark'" [variant]="'headline-3'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [theme]="'dark'" [variant]="'headline-4'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [theme]="'dark'" [variant]="'headline-5'">The quick brown fox jumps over the lazy dog</p-headline>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadlineSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-headline').forEach((headline) => {
        headline.classList.remove('hydrated');
      });
    });
  }
}
