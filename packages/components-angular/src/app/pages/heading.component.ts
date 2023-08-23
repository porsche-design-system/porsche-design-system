/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-heading',
  template: `
    <div class="playground light" title="should show heading with different color variants">
      <p-heading [color]="'primary'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [color]="'inherit'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-heading>
    </div>

    <div class="playground light" title="should show heading with different alignments">
      <p-heading [align]="'left'">Left</p-heading>
      <p-heading [align]="'center'">Center</p-heading>
      <p-heading [align]="'right'">Right</p-heading>
    </div>

    <div class="playground light" title="should cut off too long text">
      <p-heading [ellipsis]="true">
        Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-heading>
    </div>

    <div class="playground light" title="should apply custom styles for dedicated slotted content">
      <p-heading [size]="'medium'">
        <span>
          Some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-heading>
    </div>

    <div class="playground light" title="should show heading with different slotted tags in same layout">
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h1>The quick brown fox jumps over the lazy dog</h1></p-heading>
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h2>The quick brown fox jumps over the lazy dog</h2></p-heading>
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h3>The quick brown fox jumps over the lazy dog</h3></p-heading>
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h4>The quick brown fox jumps over the lazy dog</h4></p-heading>
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h5>The quick brown fox jumps over the lazy dog</h5></p-heading>
      <p-heading [size]="'inherit'" style="font-size: 1rem"><h6>The quick brown fox jumps over the lazy dog</h6></p-heading>
    </div>

    <div class="playground light" title="should show heading in different sizes">
      <p-heading [size]="'small'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [size]="'medium'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [size]="'large'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [size]="'x-large'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [size]="'xx-large'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [size]="'inherit'" style="font-size: 5rem">The quick brown fox jumps over the lazy dog</p-heading>
    </div>

    <div class="playground light" title="should show heading in different sizes on different viewports">
      <p-heading [size]="{ base: 'small', xs: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }" style="font-size: 1rem">
        The quick brown fox jumps over the lazy dog
      </p-heading>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {}
