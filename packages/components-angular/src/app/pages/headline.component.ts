import { Component } from '@angular/core';

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
      <p-headline [theme]="'dark'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
      </p-headline>
      <p-headline [theme]="'dark'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
      </p-headline>
    </div>

    <div class="playground light" title="should show headlines with different alignments">
      <p-headline [align]="'left'">Left</p-headline>
      <p-headline [align]="'center'">Center</p-headline>
      <p-headline [align]="'right'">Right</p-headline>
    </div>

    <div class="playground light" title="should cut off too long text">
      <p-headline [ellipsis]="true">
        Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum.
      </p-headline>
    </div>

    <div class="playground" title="should show headline with a link">
      <p-headline>
        <span>Lorem ipsum dolor sit amet <a href="#">linked text</a> et.</span>
      </p-headline>
    </div>
  `
})
export class HeadlineComponent {
}
