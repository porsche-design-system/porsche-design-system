/* Auto Generated File */
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
    
      div:not(.visualize-grid) {
        margin: 16px 0;
      }
    `,
  ],
  template: `
    <div class="visualize-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div title="should render with width 'fluid' (desktop: 16 columns)">
      <p-content-wrapper [width]="'fluid'">
        <p>Fluid</p>
      </p-content-wrapper>
    </div>

    <div title="should render with width 'full' (desktop: 16 columns)">
      <p-content-wrapper [width]="'full'">
        <p>Full</p>
      </p-content-wrapper>
    </div>

    <div title="should render with width 'extended' (desktop: 14 columns)">
      <p-content-wrapper>
        <p>Extended</p>
      </p-content-wrapper>
    </div>

    <div title="should render with width 'basic' (desktop: 12 columns)">
      <p-content-wrapper [width]="'basic'">
        <p>Basic</p>
      </p-content-wrapper>
    </div>

    <div title="should render with width 'narrow' (desktop: 8 columns)">
      <p-content-wrapper [width]="'narrow'">
        <p>Narrow</p>
      </p-content-wrapper>
    </div>

    <div title="should color full width although width 'basic' is enabled">
      <p-content-wrapper [width]="'basic'" style="background: deeppink">
        <p>Full viewport is colored with custom color</p>
      </p-content-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWrapperComponent {}
