/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-content-wrapper',
  styles: [
    `
      p-content-wrapper > p {
        margin: 0;
        padding: 4px 2vw;
        text-align: center;
        color: white;
        background-color: lightskyblue;
      }
    `,
  ],
  template: `
    <div class="playground" title="should render with width 'basic'">
      <p-content-wrapper>
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should render with width 'extended'">
      <p-content-wrapper [width]="'extended'">
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should render with width 'fluid'">
      <p-content-wrapper [width]="'fluid'">
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should render with 'default' background color" style="background: deeppink">
      <p-content-wrapper [backgroundColor]="'default'">
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div
      class="playground"
      title="should render with 'default' background color and dark theme"
      style="background: deeppink"
    >
      <p-content-wrapper [backgroundColor]="'default'" [theme]="'dark'">
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should color full width although width 'basic' is enabled">
      <p-content-wrapper [width]="'basic'" style="background: deeppink">
        <p>Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should not cut off to wide content">
      <p-content-wrapper [width]="'basic'">
        <p style="margin-left: -2000px; margin-right: -2000px">Some content</p>
      </p-content-wrapper>
    </div>

    <div class="playground" title="should render background for set height" style="background: deeppink">
      <p-content-wrapper [backgroundColor]="'default'" style="height: 100px">
        <p>Some content</p>
      </p-content-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWrapperComponent {}
