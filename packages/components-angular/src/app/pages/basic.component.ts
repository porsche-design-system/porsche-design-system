import { Component } from '@angular/core';

@Component({
  selector: 'app-basic',
  template: `
    <p-headline [variant]="'headline-2'" [tag]="'h2'">Basic</p-headline>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-marque&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-marque></p-marque>
          <p-marque [trademark]="false"></p-marque>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-headline&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-headline [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-headline>
          <p-headline [variant]="'headline-1'">The quick brown fox jumps over the lazy dog</p-headline>
          <p-headline [variant]="'headline-2'">The quick brown fox jumps over the lazy dog</p-headline>
          <p-headline [variant]="'headline-3'">The quick brown fox jumps over the lazy dog</p-headline>
          <p-headline [variant]="'headline-4'">The quick brown fox jumps over the lazy dog</p-headline>
          <p-headline [variant]="'headline-5'">The quick brown fox jumps over the lazy dog</p-headline>
        </div>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="5" [offset]="2">
        <div class="playground light spacing-block">
          <p-headline [variant]="'headline-3'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps
            over
            the lazy dog
          </p-headline>
          <p-headline [variant]="'headline-3'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps
            over
            the lazy dog
          </p-headline>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
      <p-grid-item size="5">
        <div class="playground dark spacing-block">
          <p-headline [variant]="'headline-3'" [theme]="'dark'" [color]="'default'" style="color: deeppink;">The quick
            brown fox jumps over the lazy dog
          </p-headline>
          <p-headline [variant]="'headline-3'" [theme]="'dark'" [color]="'inherit'" style="color: deeppink;">The quick
            brown fox jumps over the lazy dog
          </p-headline>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-text&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-text>The quick brown fox jumps over the lazy dog</p-text>
          <p-text [size]="'x-small'">The quick brown fox jumps over the lazy dog</p-text>
        </div>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="5" [offset]="2">
        <div class="playground light spacing-block">
          <p-text [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
          <p-text [color]="'brand'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
          <p-text [color]="'neutral-contrast-high'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
          </p-text>
          <p-text [color]="'neutral-contrast-medium'" style="color: deeppink;">The quick brown fox jumps over the lazy
            dog
          </p-text>
          <p-text [color]="'neutral-contrast-low'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
          </p-text>
          <p-text [color]="'notification-success'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
          </p-text>
          <p-text [color]="'notification-warning'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
          </p-text>
          <p-text [color]="'notification-error'" style="color: deeppink;">The quick brown fox jumps over the lazy dog
          </p-text>
          <p-text [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
        </div>
      </p-grid-item>
      <p-grid-item size="5">
        <div class="playground dark spacing-block">
          <p-text [theme]="'dark'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy
            dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'brand'" style="color: deeppink;">The quick brown fox jumps over the lazy
            dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'neutral-contrast-high'" style="color: deeppink;">The quick brown fox jumps
            over the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'neutral-contrast-medium'" style="color: deeppink;">The quick brown fox
            jumps
            over the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'neutral-contrast-low'" style="color: deeppink;">The quick brown fox jumps
            over the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'notification-success'" style="color: deeppink;">The quick brown fox jumps
            over the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'notification-warning'" style="color: deeppink;">The quick brown fox jumps
            over the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'notification-error'" style="color: deeppink;">The quick brown fox jumps
            over
            the lazy dog
          </p-text>
          <p-text [theme]="'dark'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy
            dog
          </p-text>
        </div>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="10" [offset]="2">
        <div class="playground light spacing-block">
          <p-text [ellipsis]="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum.
          </p-text>
        </div>
        <div class="playground light spacing-block">
          <p-text>Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
            text</strong></p-text>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>`
})
export class BasicComponent {

}
