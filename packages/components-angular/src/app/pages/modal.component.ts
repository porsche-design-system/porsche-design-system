/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal',
  styles: [
    `
      body {
        overflow: auto !important;
        background: deeppink;
      }
    
      .playground {
        height: 600px;
        padding: 0;
        background: linear-gradient(
          90deg,
          rgba(20, 84, 255, 0) 0%,
          rgba(20, 84, 255, 1) 50%,
          rgba(20, 84, 255, 0) 100%
        ) !important;
        transform: translate3d(0, 0, 0);
      }
      .playground {
        margin: 16px 0;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show modal">
      <p-modal [heading]="'Heading'" [open]="true">Some Content: should show modal</p-modal>
    </div>

    <div class="playground light" title="should show modal (fullscreen=true)">
      <p-modal [heading]="'Heading'" [open]="true" [fullscreen]="true"> Some content: should show modal (fullscreen=true) </p-modal>
    </div>

    <div class="playground light" title="should display a full width div when using .stretch-to-full-modal-width">
      <p-modal [open]="true" [aria]="{ 'aria-label': 'Some Heading' }">
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 60px"></div>
        <p-text>Some Content: should display a full width div when using .stretch-to-full-modal-width</p-text>
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 60px"></div>
      </p-modal>
    </div>

    <div class="playground light" title="should show modal (fullscreen=responsive)">
      <p-modal
        [heading]="'Heading'"
        [open]="true"
        [fullscreen]="{ base: true, xs: false, s: true, m: false, l: true, xl: false, xxl: true }"
      >
        Some Content: should show modal (fullscreen=responsive)
      </p-modal>
    </div>

    <div class="playground light" title="should display close button on the correct position without a heading">
      <p-modal [open]="true" [aria]="{ 'aria-label': 'Some Heading' }">
        Some Content: should display close button on the correct position without a heading
      </p-modal>
    </div>

    <div class="playground light" title="should show scrollable modal">
      <p-modal [heading]="'Heading'" [open]="true">
        Some content: should show scrollable modal
        <br />
        <br />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet.
        <br />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet.
        <br />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet.
        <br />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam.
      </p-modal>
    </div>

    <div class="playground light" title="should show modal with slotted heading">
      <p-modal [open]="true" [aria]="{ 'aria-label': 'Slotted Headline' }">
        <div slot="heading">
          <p-text [tag]="'div'" [role]="'doc-subtitle'">Slotted Subtitle</p-text>
          <p-heading [tag]="'h2'">Slotted heading</p-heading>
        </div>
        <span>
          Some Content: should show modal with slotted heading
          <br />
          <br />
          And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-modal>
    </div>

    <div class="playground light" title="should show modal with disableCloseButton=true">
      <p-modal [open]="true" [heading]="'disableCloseButton=true'" [disableCloseButton]="true">
        Some Content: should show modal with disableCloseButton=true
      </p-modal>
    </div>

    <div class="playground light" title="should show modal with dismissButton=false">
      <p-modal [open]="true" [heading]="'dismissButton=false'" [dismissButton]="false">
        Some Content: should show modal with dismissButton=false
      </p-modal>
    </div>

    <div class="playground light" title="should show modal with sticky footer">
      <p-modal [open]="true" [heading]="'Sticky footer'">
        <div style="height: 110vh">Some Content: should show modal with sticky footer</div>
        <div slot="footer">Sticky footer</div>
      </p-modal>
    </div>

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {}
