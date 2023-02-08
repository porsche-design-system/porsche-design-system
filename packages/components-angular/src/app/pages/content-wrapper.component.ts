/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-content-wrapper',
  styles: [
    `
      .visualize-grid {
        /* TODO: We should generate the grid visualization based on styles package and provided by shared package somehow */
        margin: 0;
        display: grid;
        padding: 0 max(0px, (100% - 2560px) / 2);
        grid-gap: clamp(16px, 3.6vw, 36px);
        max-width: 2560px;
        min-width: 320px;
        box-sizing: content-box;
        grid-template-columns:
          [full-start] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
          [extended-start basic-start narrow-start] repeat(6, minmax(0, 1fr))
          [narrow-end basic-end extended-end] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
          [full-end];
        --pds-internal-grid-safe-zone: clamp(22px, 10.625vw - 12px, 192px);
        --pds-grid-basic-span-one-half: span 3;
        --pds-grid-basic-span-one-third: span 2;
        --pds-grid-narrow-span-one-half: span 3;
        --pds-grid-basic-span-two-thirds: span 4;
        --pds-grid-extended-span-one-half: span 3;
        position: fixed;
        inset: 0;
        pointer-events: none;
      }
    
      @media (min-width: 760px) {
        .visualize-grid {
          grid-template-columns:
            [full-start] minmax(0, calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px)))
            [extended-start] repeat(1, minmax(0, 1fr)) [basic-start] repeat(2, minmax(0, 1fr)) [narrow-start] repeat(
              8,
              minmax(0, 1fr)
            )
            [narrow-end] repeat(2, minmax(0, 1fr)) [basic-end] repeat(1, minmax(0, 1fr)) [extended-end] minmax(
              0,
              calc(var(--pds-internal-grid-safe-zone) - clamp(16px, 3.6vw, 36px))
            )
            [full-end];
          --pds-grid-basic-span-one-half: span 6;
          --pds-grid-basic-span-one-third: span 4;
          --pds-grid-narrow-span-one-half: span 4;
          --pds-grid-basic-span-two-thirds: span 8;
          --pds-grid-extended-span-one-half: span 7;
        }
      }
    
      @media (min-width: 1920px) {
        .visualize-grid {
          --pds-internal-grid-safe-zone: clamp(192px, 50vw - 768px, 512px);
        }
      }
    
      .visualize-grid-columns {
        transform: translate3d(0, 0, 0);
      }
    
      @media (max-width: 759px) {
        .visualize-grid-columns:nth-child(n + 9) {
          display: none;
        }
      }
    
      .visualize-grid-columns::before {
        content: '';
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 255, 0.1);
      }
    
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
      <span class="visualize-grid-columns"></span>
      <span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span><span class="visualize-grid-columns"></span
      ><span class="visualize-grid-columns"></span>
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
      <p-content-wrapper [width]="'extended'">
        <p>Extended</p>
      </p-content-wrapper>
    </div>

    <div title="should render with width 'basic' (desktop: 12 columns)">
      <p-content-wrapper>
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
