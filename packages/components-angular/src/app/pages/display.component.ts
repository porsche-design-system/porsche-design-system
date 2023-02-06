/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-display',
  template: `
    <div class="playground light" title="should show display with different color variants on light background">
      <p-display [color]="'primary'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-display>
      <p-display [color]="'inherit'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-display>
    </div>

    <div class="playground dark" title="should show display with different color variants on dark background">
      <p-display [theme]="'dark'" [color]="'primary'" style="color: deeppink"
        >The quick brown fox jumps over the lazy dog</p-display
      >
      <p-display [theme]="'dark'" [color]="'inherit'" style="color: deeppink"
        >The quick brown fox jumps over the lazy dog</p-display
      >
    </div>

    <div class="playground" title="should show display with different alignments">
      <p-display [align]="'left'">Left</p-display>
      <p-display [align]="'center'">Center</p-display>
      <p-display [align]="'right'">Right</p-display>
    </div>

    <div class="playground" title="should cut off too long text">
      <p-display [ellipsis]="true">
        Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-display>
    </div>

    <div class="playground" title="should apply custom styles for dedicated slotted content">
      <p-display [size]="'medium'">
        <span>
          Some slotted and deeply nested <a [href]="'#'">link</a> and <button>button</button>, <b>bold</b>,
          <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
        </span>
      </p-display>
    </div>

    <div class="playground" title="should show display with different slotted tags in same layout as default">
      <p-display [size]="'inherit'" style="font-size: 1rem"><h1>The quick brown fox jumps over the lazy dog</h1></p-display>
      <p-display [size]="'inherit'" style="font-size: 1rem"><h2>The quick brown fox jumps over the lazy dog</h2></p-display>
      <p-display [size]="'inherit'" style="font-size: 1rem"><h3>The quick brown fox jumps over the lazy dog</h3></p-display>
      <p-display [size]="'inherit'" style="font-size: 1rem"><h4>The quick brown fox jumps over the lazy dog</h4></p-display>
      <p-display [size]="'inherit'" style="font-size: 1rem"><h5>The quick brown fox jumps over the lazy dog</h5></p-display>
      <p-display [size]="'inherit'" style="font-size: 1rem"><h6>The quick brown fox jumps over the lazy dog</h6></p-display>
    </div>

    <div class="playground" title="should show display in different sizes">
      <p-display [size]="'medium'">The quick brown fox jumps over the lazy dog</p-display>
      <p-display [size]="'large'">The quick brown fox jumps over the lazy dog</p-display>
      <p-display [size]="'inherit'" style="font-size: 5rem">The quick brown fox jumps over the lazy dog</p-display>
    </div>

    <div class="playground" title="should show display in different sizes on different viewports">
      <p-display [size]="{ base: 'medium', m: 'inherit', l: 'large' }" style="font-size: 5rem">
        The quick brown fox jumps over the lazy dog
      </p-display>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {}
