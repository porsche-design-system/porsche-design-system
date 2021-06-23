import { Component } from '@angular/core';

@Component({
  selector: 'page-accordion',
  template: `
    <div class="playground light" title="should render accordion on light background">
      <p-accordion [heading]="'Some heading'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion with slotted heading on light background">
      <p-accordion>
        <span slot="heading">Some heading</span>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion with slotted heading on dark background">
      <p-accordion [theme]="'dark'">
        <span slot="heading">Some heading</span>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion open on light background">
      <p-accordion [heading]="'Some heading'" [open]="true">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion open on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [open]="true">
        <div style="color: white">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </div>
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion size medium on light background">
      <p-accordion [heading]="'Some heading'" [size]="'medium'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion size medium on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [size]="'medium'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion with breakpoint customizable size on light background">
      <p-accordion [heading]="'Some heading'" [size]="{ base: 'small', m: 'medium', l: 'small' }">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion with breakpoint customizable size on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [size]="{ base: 'small', m: 'medium', l: 'small' }">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion weight regular on light background">
      <p-accordion [heading]="'Some heading'" [weight]="'regular'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion weight regular on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [weight]="'regular'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground light" title="should render accordion weight regular and size medium on light background">
      <p-accordion [heading]="'Some heading'" [weight]="'regular'" [size]="'medium'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render accordion weight regular and size medium on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [weight]="'regular'" [size]="'medium'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div style="width: 400px">
      <div
        class="playground light"
        title="should render accordion with long heading that breaks to second line on light background"
      >
        <p-accordion [heading]="'Some extra long heading that should break to the second line'">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </p-accordion>
      </div>

      <div
        class="playground dark"
        title="should render accordion with long heading that breaks to second line on dark background"
      >
        <p-accordion [heading]="'Some extra long heading that should break to the second line'" [theme]="'dark'">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </p-accordion>
      </div>
    </div>

    <div class="playground light" title="should render multiple accordions with one open on light background">
      <p-accordion [heading]="'Some heading'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [open]="true">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
      <p-accordion [heading]="'Some heading'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>

    <div class="playground dark" title="should render multiple accordions with one open on dark background">
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [theme]="'dark'" [open]="true">
        <div style="color: white">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </div>
      </p-accordion>
      <p-accordion [heading]="'Some heading'" [theme]="'dark'">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-accordion>
    </div>
  `,
})
export class AccordionComponent {}
