/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text-list',
  template: `
    <div class="playground light" title="should show text list type=unordered on light background">
      <p-text-list>
        <p-text-list-item>Unordered root list item</p-text-list-item>
        <p-text-list-item>
          Unordered root list item
          <p-text-list>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Unordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show text list type=unordered on dark background">
      <p-text-list [theme]="'dark'">
        <p-text-list-item>Unordered root list item</p-text-list-item>
        <p-text-list-item>
          Unordered root list item
          <p-text-list [theme]="'dark'">
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Unordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show text list type=numbered on light background">
      <p-text-list [type]="'numbered'">
        <p-text-list-item>Numbered root list item</p-text-list-item>
        <p-text-list-item>
          Numbered root list item
          <p-text-list [type]="'numbered'">
            <p-text-list-item>Numbered nested list item</p-text-list-item>
            <p-text-list-item>Numbered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Numbered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show text list type=numbered on dark background">
      <p-text-list [type]="'numbered'" [theme]="'dark'">
        <p-text-list-item>Numbered root list item</p-text-list-item>
        <p-text-list-item>
          Numbered root list item
          <p-text-list [type]="'numbered'" [theme]="'dark'">
            <p-text-list-item>Numbered nested list item</p-text-list-item>
            <p-text-list-item>Numbered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Numbered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show text list type=alphabetically on light background">
      <p-text-list [type]="'alphabetically'">
        <p-text-list-item>Alphabetically root list item</p-text-list-item>
        <p-text-list-item>
          Alphabetically root list item
          <p-text-list [type]="'alphabetically'">
            <p-text-list-item>Alphabetically nested list item</p-text-list-item>
            <p-text-list-item>Alphabetically nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Alphabetically root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show text list type=alphabetically on dark background">
      <p-text-list [type]="'alphabetically'" [theme]="'dark'">
        <p-text-list-item>Alphabetically root list item</p-text-list-item>
        <p-text-list-item>
          Alphabetically root list item
          <p-text-list [type]="'alphabetically'" [theme]="'dark'">
            <p-text-list-item>Alphabetically nested list item</p-text-list-item>
            <p-text-list-item>Alphabetically nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Alphabetically root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list numbered on light background">
      <p-text-list [listType]="'ordered'">
        <p-text-list-item>
          Numbered, ordered root list item
          <p-text-list [listType]="'unordered'">
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Numbered, ordered root list item
          <p-text-list [listType]="'ordered'">
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list numbered on dark background">
      <p-text-list [listType]="'ordered'" [theme]="'dark'">
        <p-text-list-item>
          Numbered, ordered root list item
          <p-text-list [listType]="'unordered'" [theme]="'dark'">
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Numbered, ordered root list item
          <p-text-list [listType]="'ordered'" [theme]="'dark'">
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list alphabetically on light background">
      <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
        <p-text-list-item>
          Alphabetically, ordered root list item
          <p-text-list [listType]="'unordered'">
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Alphabetically, ordered root list item
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
            <p-text-list-item>Alphabetically, ordered nested list item</p-text-list-item>
            <p-text-list-item>Alphabetically, ordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Alphabetically, ordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list alphabetically on dark background">
      <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
        <p-text-list-item>
          Alphabetically, ordered root list item
          <p-text-list [listType]="'unordered'" [theme]="'dark'">
            <p-text-list-item>Unordered nested list item</p-text-list-item>
            <p-text-list-item>Unordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Alphabetically, ordered root list item
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'" [theme]="'dark'">
            <p-text-list-item>Alphabetically, ordered nested list item</p-text-list-item>
            <p-text-list-item>Alphabetically, ordered nested list item</p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Alphabetically, ordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should handle edge cases">
      <p-text-list [listType]="'ordered'">
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
        <p-text-list-item>
          Numbered, ordered root list item
          <p-text-list [listType]="'ordered'">
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
            <p-text-list-item>
              Numbered, ordered nested list item
              <p-text-list [listType]="'ordered'">
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
                <p-text-list-item>Numbered, ordered nested list item</p-text-list-item>
              </p-text-list>
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>Numbered, ordered root list item</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show multiline text list">
      <p-text-list [listType]="'ordered'" style="width: 15rem">
        <p-text-list-item>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Cursus mattis molestie a iaculis.
          <p-text-list [listType]="'ordered'">
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Cursus mattis molestie a iaculis.
          <p-text-list>
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Cursus mattis molestie a iaculis.
          <p-text-list [listType]="'ordered'" [orderType]="'alphabetically'">
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
            <p-text-list-item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Cursus mattis molestie a iaculis.
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should apply custom styles for dedicated slotted content">
      <p-text-list>
        <p-text-list-item>
          <span>
            Some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should apply custom styles for dedicated slotted content">
      <p-text-list [theme]="'dark'">
        <p-text-list-item>
          <span>
            Some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </p-text-list-item>
      </p-text-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextListComponent {}
