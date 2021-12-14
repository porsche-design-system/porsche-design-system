import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-headline',
  template: `
    <div class="playground light" title="should show headlines with different style variants">
      <p-headline [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-1'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-2'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-3'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-4'">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [variant]="'headline-5'">The quick brown fox jumps over the lazy dog</p-headline>
    </div>

    <div class="playground light" title="should show headlines with different style variants if tags are set as slots">
      <p-headline [variant]="'large-title'"><h1>The quick brown fox jumps over the lazy dog</h1></p-headline>
      <p-headline [variant]="'headline-1'"><h1>The quick brown fox jumps over the lazy dog</h1></p-headline>
      <p-headline [variant]="'headline-2'"><h2>The quick brown fox jumps over the lazy dog</h2></p-headline>
      <p-headline [variant]="'headline-3'"><h3>The quick brown fox jumps over the lazy dog</h3></p-headline>
      <p-headline [variant]="'headline-4'"><h4>The quick brown fox jumps over the lazy dog</h4></p-headline>
      <p-headline [variant]="'headline-5'"><h5>The quick brown fox jumps over the lazy dog</h5></p-headline>
      <p-headline [variant]="'headline-5'"><h6>The quick brown fox jumps over the lazy dog</h6></p-headline>
    </div>

    <div class="playground light" title="should show headline with different color variants on light background">
      <p-headline [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
      <p-headline [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
    </div>

    <div class="playground dark" title="should show headline with different color variants on dark background">
      <p-headline [theme]="'dark'" [color]="'default'" style="color: deeppink;"
        >The quick brown fox jumps over the lazy dog
      </p-headline>
      <p-headline [theme]="'dark'" [color]="'inherit'" style="color: deeppink;"
        >The quick brown fox jumps over the lazy dog
      </p-headline>
    </div>

    <div class="playground light" title="should show headlines with different alignments">
      <p-headline [align]="'left'">Left</p-headline>
      <p-headline [align]="'center'">Center</p-headline>
      <p-headline [align]="'right'">Right</p-headline>

      <p-headline [align]="'left'" [variant]="'inherit'">Left</p-headline>
      <p-headline [align]="'center'" [variant]="'inherit'">Center</p-headline>
      <p-headline [align]="'right'" [variant]="'inherit'">Right</p-headline>
    </div>

    <div class="playground light" title="should cut off too long text">
      <p-headline [ellipsis]="true">
        Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum.
      </p-headline>

      <p-headline [ellipsis]="true" [variant]="'inherit'">
        Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum.
      </p-headline>
    </div>

    <div class="playground" title="should apply custom styles for dedicated slotted content">
      <p-headline>
        <span
          >Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text</span
        >
      </p-headline>
    </div>

    <div class="playground" title="should show headline for variant customizable">
      <p-headline [variant]="{ base: 'large', l: 'x-large' }"> Lorem ipsum dolor sit amet et.</p-headline>
    </div>

    <div class="playground" title="should consider only font-size definition on host element for variant inherit">
      <div style="height: 72px; border-left: 10px solid deeppink">
        <p-headline
          [variant]="'inherit'"
          style="
        font-size: 60px;
        line-height: 10;
        font-family: serif;
        font-weight: 100;
        color: deeppink;
        text-align: right;
        border-left: 10px solid deepskyblue;
      "
          >ABC</p-headline
        >
      </div>
      <br />
      <div style="height: 72px; border-left: 10px solid deeppink">
        <p-headline
          [variant]="'inherit'"
          style="
        font-size: 60px;
        line-height: 10;
        font-family: serif;
        font-weight: 100;
        color: deeppink;
        text-align: right;
        border-left: 10px solid deepskyblue;
      "
        >
          <h3
            style="
          margin: 100px;
          padding: 100px;
          font-size: 200px;
          line-height: 5;
          font-family: serif;
          font-weight: 100;
          color: deeppink;
          text-align: right;
        "
          >
            ABC
          </h3>
        </p-headline>
      </div>
    </div>

    <div
      class="playground"
      title="should automatically break words/strings into new line being too long to fit inside their container"
    >
      <p-headline [variant]="'headline-3'" style="width: 240px; background: deeppink;"
        >This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long
        one.</p-headline
      >
      <p-headline [variant]="'headline-3'" style="width: 240px; background: deepskyblue;">
        <h3 style="overflow-wrap: normal; word-wrap: normal; hyphens: manual;">
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </h3>
      </p-headline>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadlineComponent {}
