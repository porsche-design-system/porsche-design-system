import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  template: `
    <p-headline [variant]="'headline-2'">Content</p-headline>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-text-list&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground light spacing-block">
          <p-text-list>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list>
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
        <div class="playground light spacing-inline">
          <p-text-list [listType]="'ordered'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list [listType]="'ordered'">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
        <div class="playground light spacing-inline">
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground dark spacing-block">
          <p-text-list [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list [theme]="'dark'">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
        <div class="playground dark spacing-block">
          <p-text-list [listType]="'ordered'" [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list [listType]="'ordered'" [theme]="'dark'">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
        <div class="playground dark spacing-inline">
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick <a [href]="'https://designsystem.porsche.com'">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
              <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
                <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
                <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
  `
})
export class ContentComponent {

}
