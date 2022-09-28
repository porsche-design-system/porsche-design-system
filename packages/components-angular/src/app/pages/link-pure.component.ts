/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-pure',
  styles: [
    `
      p-link-pure:not(:last-child) {
        margin-right: 0.5rem;
      }
      .stretched-links p-link-pure {
        margin-right: 0;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-link-pure [href]="'https://www.porsche.com'">Label default</p-link-pure>
      <p-link-pure><a [href]="'https://www.porsche.com'">Label slotted</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render with label on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [theme]="'dark'">Label default</p-link-pure>
      <p-link-pure [theme]="'dark'"><a [href]="'https://www.porsche.com'">Label slotted</a></p-link-pure>
    </div>

    <div class="playground light" title="should render without label">
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link-pure>
      <p-link-pure [hideLabel]="true"><a [href]="'https://www.porsche.com'">Some label</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render without label on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link-pure>
      <p-link-pure [hideLabel]="true" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with responsive label">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        Label responsive
      </p-link-pure>
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        Label responsive
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different size">
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-small'">Label size x-small</p-link-pure>
      <p-link-pure [size]="'x-small'"><a [href]="'https://www.porsche.com'">Label slotted size x-small</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'small'">Label size small</p-link-pure>
      <p-link-pure [size]="'small'"><a [href]="'https://www.porsche.com'">Label slotted size small</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'medium'">Label size medium</p-link-pure>
      <p-link-pure [size]="'medium'"><a [href]="'https://www.porsche.com'">Label slotted size medium</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'large'">Label size large</p-link-pure>
      <p-link-pure [size]="'large'"><a [href]="'https://www.porsche.com'">Label slotted size large</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-large'">Label size x-large</p-link-pure>
      <p-link-pure [size]="'x-large'"><a [href]="'https://www.porsche.com'">Label slotted size x-large</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'inherit'" style="font-size: 48px">Label size inherit</p-link-pure>
      <p-link-pure [size]="'inherit'" style="font-size: 48px">
        <a [href]="'https://www.porsche.com'">Label slotted size inherit</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with responsive size">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [size]="{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }"
        style="font-size: 48px"
      >
        Label size responsive
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different weight">
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'thin'">Label weight thin</p-link-pure>
      <p-link-pure [weight]="'thin'"><a [href]="'https://www.porsche.com'">Label slotted weight thin</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'regular'">Label weight regular</p-link-pure>
      <p-link-pure [weight]="'regular'"><a [href]="'https://www.porsche.com'">Label slotted weight regular</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'bold'">Label weight bold</p-link-pure>
      <p-link-pure [weight]="'bold'"><a [href]="'https://www.porsche.com'">Label slotted weight bold</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with active state">
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true">Label active</p-link-pure>
      <p-link-pure [active]="true"><a [href]="'https://www.porsche.com'">Label slotted active</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true">
        Label active
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground dark" title="should render with active state on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true" [theme]="'dark'">Label active</p-link-pure>
      <p-link-pure [active]="true" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Label slotted active</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true" [theme]="'dark'">
        Label active
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with specific icon">
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'phone'">Label with specific icon</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [iconSource]="'./assets/icon-custom-kaixin.svg'">
        Label with iconSource
      </p-link-pure>
    </div>

    <div class="playground dark" title="should render with specific icon on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'phone'" [theme]="'dark'">Label with specific icon</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [theme]="'dark'">
        Label with iconSource
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-link-pure [href]="'https://www.porsche.com'" style="width: 240px">
        Label multiline lorem ipsum dolor sit amet, consetetur sadipscing
      </p-link-pure>
      <p-link-pure style="width: 240px">
        <a [href]="'https://www.porsche.com'">Label slotted multiline lorem ipsum dolor sit amet, consetetur sadipscing</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with custom clickable area">
      <p-link-pure [href]="'https://www.porsche.com'" style="padding: 1rem">Label with custom click-area</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true" style="padding: 1rem">
        Label with custom click-area
      </p-link-pure>
      <p-link-pure style="padding: 1rem">
        <a [href]="'https://www.porsche.com'">Label slotted with custom click-area</a>
      </p-link-pure>
      <p-link-pure [hideLabel]="true" style="padding: 1rem">
        <a [href]="'https://www.porsche.com'">Label slotted with custom click-area</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with subline">
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'small'">
        Label size small
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'medium'">
        Label size medium
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'large'">
        Label size large
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-large'">
        Label size x-large
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [size]="'large'">
        <a [href]="'https://www.porsche.com'">Label slotted size large</a>
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with no icon">
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'none'">Label icon none</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'none'" [size]="'inherit'" style="font-size: 48px"
        >Label icon none size inherit</p-link-pure
      >
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [icon]="'none'"
        [size]="{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }"
        style="font-size: 48px"
        >Label icon none size responsive</p-link-pure
      >
      <p-link-pure [icon]="'none'"><a [href]="'https://www.porsche.com'">Label slotted icon none</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'small'" [icon]="'none'">
        Label icon none
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render icon if hide-label and icon none is set">
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true" [icon]="'none'">Label hide-label icon none</p-link-pure>
      <p-link-pure [hideLabel]="true" [icon]="'none'">
        <a [href]="'https://www.porsche.com'">Label slotted with hideLabel and no icon</a>
      </p-link-pure>
      <p-link-pure [hideLabel]="true" [size]="'small'" [icon]="'none'">
        <a [href]="'https://www.porsche.com'">Label hide-label icon none</a>
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should align label to the left">
      <p-link-pure [href]="'https://www.porsche.com'" [alignLabel]="'left'">Label align left</p-link-pure>
      <p-link-pure [alignLabel]="'left'"><a [href]="'https://www.porsche.com'">Label slotted align left</a></p-link-pure>
    </div>
    <div class="playground light" title="should align label to the left or right depending on viewport">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }"
      >
        Label align responsive
      </p-link-pure>
      <p-link-pure [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }">
        <a [href]="'https://www.porsche.com'">Label slotted align responsive</a>
      </p-link-pure>
    </div>

    <div class="playground light stretched-links" title="should render with stretched label">
      <p-link-pure [href]="'https://www.porsche.com'" [stretch]="true">Label stretch</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [stretch]="true" [alignLabel]="'left'">Label stretch align left</p-link-pure>
      <p-link-pure [stretch]="true"><a [href]="'https://www.porsche.com'">Label slotted stretch</a></p-link-pure>
      <p-link-pure [stretch]="true" [alignLabel]="'left'">
        <a [href]="'https://www.porsche.com'">Label slotted stretch align left</a>
      </p-link-pure>
    </div>

    <div class="playground light stretched-links" title="should render with stretched label depending on viewport">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        Label stretch responsive
      </p-link-pure>
      <p-link-pure [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">
        <a [href]="'https://www.porsche.com'">Label slotted stretch responsive</a>
      </p-link-pure>
    </div>

    <div
      class="playground light stretched-links"
      title="should render with interplay of breakpoint-customizable depending on viewport"
    >
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [size]="{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'x-small' }"
        [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }"
      >
        Label multiple breakpoint-customizable
      </p-link-pure>
      <p-link-pure
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [size]="{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'x-small' }"
        [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }"
      >
        <a [href]="'https://www.porsche.com'">Label slotted multiple breakpoint-customizable</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should not align label left or stretch if it has a subline">
      <p-link-pure [href]="'https://www.porsche.com'" [alignLabel]="'left'">
        Label align left
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [stretch]="true">
        Label stretch
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPureComponent {}
