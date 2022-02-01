/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text',
  template: `
    <div class="playground" title="should show text in different sizes">
      <p-text [size]="'x-small'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text>The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'medium'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'large'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'x-large'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [size]="'inherit'" style="font-size: 48px">The quick brown fox jumps over the lazy dog</p-text>
    </div>

    <div class="playground" title="should show text in different sizes on different viewports">
      <p-text [size]="{ base: 'small', m: 'inherit', l: 'medium' }" style="font-size: 80px">
        The quick brown fox jumps over the lazy dog
      </p-text>
    </div>

    <div class="playground" title="should show whole text in thin and bold">
      <p-text [weight]="'thin'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [weight]="'regular'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [weight]="'semibold'">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [weight]="'bold'">The quick brown fox jumps over the lazy dog</p-text>
    </div>

    <div class="playground light" title="should show text with different color variants on light background">
      <p-text [color]="'default'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'brand'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'neutral-contrast-high'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'neutral-contrast-medium'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'neutral-contrast-low'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'notification-success'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'notification-warning'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'notification-error'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'notification-neutral'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [color]="'inherit'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
    </div>

    <div class="playground dark" title="should show text with different color variants on dark background">
      <p-text [theme]="'dark'" [color]="'default'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'" [color]="'brand'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
      <p-text [theme]="'dark'" [color]="'neutral-contrast-high'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'neutral-contrast-medium'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'neutral-contrast-low'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'notification-success'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'notification-warning'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'notification-error'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'notification-neutral'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-text>
      <p-text [theme]="'dark'" [color]="'inherit'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-text>
    </div>

    <div class="playground" title="should show text with different alignments">
      <p-text [align]="'left'">Left</p-text>
      <p-text [align]="'center'">Center</p-text>
      <p-text [align]="'right'">Right</p-text>
    </div>

    <div class="playground" title="should cut off too long text">
      <p-text [ellipsis]="true">
        Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-text>
    </div>

    <div class="playground" title="should apply custom styles for dedicated slotted content">
      <p-text>
        <span>
          Some slotted and deeply nested <a [href]="'#'">linked</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text
        </span>
      </p-text>
    </div>

    <div class="playground" title="should show text with different slotted tags in same layout as default">
      <p-text><p>The quick brown fox jumps over the lazy dog</p></p-text>
      <p-text><address>The quick brown fox jumps over the lazy dog</address></p-text>
      <p-text><blockquote>The quick brown fox jumps over the lazy dog</blockquote></p-text>
      <p-text><figcaption>The quick brown fox jumps over the lazy dog</figcaption></p-text>
      <p-text><cite>The quick brown fox jumps over the lazy dog</cite></p-text>
      <p-text><time>The quick brown fox jumps over the lazy dog</time></p-text>
      <p-text><legend>The quick brown fox jumps over the lazy dog</legend></p-text>
    </div>

    <div
      class="playground"
      title="should automatically break words/strings into new line being too long to fit inside their container"
    >
      <p-text style="width: 240px; background: deeppink">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-text>
      <p-text style="width: 240px; background: deepskyblue">
        <p style="overflow-wrap: normal; word-wrap: normal; hyphens: manual">
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </p>
      </p-text>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {}
