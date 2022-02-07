/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text-list',
  template: `
    <div class="playground light" title="should show unordered text list on light background">
      <p-text-list>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show unordered text list on dark background">
      <p-text-list [theme]="'dark'">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list numbered on light background">
      <p-text-list [listType]="'ordered'">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list [listType]="'ordered'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list numbered on dark background">
      <p-text-list [listType]="'ordered'" [theme]="'dark'">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list [listType]="'ordered'" [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list alphabetically on light background">
      <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list alphabetically on dark background">
      <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>
          The quick brown fox jumps over the lazy dog
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should apply custom styles for dedicated slotted content">
      <p-text-list>
        <p-text-list-item>
          <span>
            Some slotted and deeply nested <a [href]="'#'">linked</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text
          </span>
        </p-text-list-item>
      </p-text-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextListComponent {}
