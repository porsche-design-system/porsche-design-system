/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-full-width-slot',
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
    
      .playground {
        height: 500px;
        padding: 0;
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
  template: `
    <div class="playground light" title="should display a full width div when using .stretch-to-full-modal-width">
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal [open]="true" [aria]="{ 'aria-label': 'Some Heading' }">
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 60px"></div>
        <p-text>Some Content between two full width slotted divs</p-text>
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 60px"></div>
        <p-text>Some Content between two full width slotted divs</p-text>
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 60px"></div>
      </p-modal>
    </div>

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFullWidthSlotComponent {}
