import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-pure',
  styles: [
    `
      p-link-pure:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-link-pure [href]="'https://www.porsche.com'">Some label</p-link-pure>
      <p-link-pure><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render with label on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [theme]="'dark'">Some label</p-link-pure>
      <p-link-pure [theme]="'dark'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render without label">
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link-pure>
      <p-link-pure [hideLabel]="true"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render without label on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link-pure>
      <p-link-pure [hideLabel]="true" [theme]="'dark'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with responsive label">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        >Some label
      </p-link-pure>
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        >Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different size">
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-small'">Some label</p-link-pure>
      <p-link-pure [size]="'x-small'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'small'">Some label</p-link-pure>
      <p-link-pure [size]="'small'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'medium'">Some label</p-link-pure>
      <p-link-pure [size]="'medium'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'large'">Some label</p-link-pure>
      <p-link-pure [size]="'large'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-large'">Some label</p-link-pure>
      <p-link-pure [size]="'x-large'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br />
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'inherit'" style="font-size: 48px;"
        >Some label</p-link-pure
      >
      <p-link-pure [size]="'inherit'" style="font-size: 48px;"
        ><a href="https://www.porsche.com">Some label</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with responsive size">
      <p-link-pure
        [href]="'https://www.porsche.com'"
        [size]="{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }"
        style="font-size: 48px;"
        >Some label
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different weight">
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'thin'">Some label</p-link-pure>
      <p-link-pure [weight]="'thin'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'regular'">Some label</p-link-pure>
      <p-link-pure [weight]="'regular'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [weight]="'bold'">Some label</p-link-pure>
      <p-link-pure [weight]="'bold'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with active state">
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true">Some label</p-link-pure>
      <p-link-pure [active]="true"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground dark" title="should render with active state on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [active]="true" [theme]="'dark'">Some label</p-link-pure>
      <p-link-pure [active]="true" [theme]="'dark'"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with specific icon">
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'phone'">Some label</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [iconSource]="'assets/icon-custom-kaixin.svg'"
        >Some label</p-link-pure
      >
    </div>

    <div class="playground dark" title="should render with specific icon on dark background">
      <p-link-pure [href]="'https://www.porsche.com'" [icon]="'phone'" [theme]="'dark'">Some label</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [iconSource]="'assets/icon-custom-kaixin.svg'" [theme]="'dark'"
        >Some label</p-link-pure
      >
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-link-pure [href]="'https://www.porsche.com'" style="width: 240px;"
        >Lorem ipsum dolor sit amet, consetetur sadipscing
      </p-link-pure>
      <p-link-pure style="width: 240px;"
        ><a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a></p-link-pure
      >
    </div>

    <div class="playground light" title="should render with custom clickable area">
      <p-link-pure [href]="'https://www.porsche.com'" style="padding: 1rem;">Some label</p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [hideLabel]="true" style="padding: 1rem;">Some label</p-link-pure>
      <p-link-pure style="padding: 1rem;"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure [hideLabel]="true" style="padding: 1rem;"
        ><a href="https://www.porsche.com">Some label</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with subline">
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'small'"
        >Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'medium'"
        >Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'large'"
        >Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [href]="'https://www.porsche.com'" [size]="'x-large'"
        >Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure [size]="'large'">
        <a href="https://www.porsche.com">Some label</a>
        <p slot="subline">Some subline</p>
      </p-link-pure>

      <div class="playground light" title="should render with no icon">
        <p-link-pure [href]="'https:  //www.porsche.com'" [icon]="'none'">Without icon</p-link-pure>
        <p-link-pure [icon]="'none'"><a href="https://www.porsche.com">Slotted without icon</a></p-link-pure>
        <p-link-pure [href]="'https:  //www.porsche.com'" [size]="'small'" [icon]="'none'"
          >Without icon
          <p slot="subline">Some subline</p></p-link-pure
        >
      </div>

      <div class="playground light" title="should render icon if hide-label and icon none is set">
        <p-link-pure [href]="'https:  //www.porsche.com'" [hideLabel]="true" [icon]="'none'"
          >With hideLabel and no icon</p-link-pure
        >
        <p-link-pure [hideLabel]="true" [icon]="'none'"
          ><a href="https://www.porsche.com">With hideLabel and no icon</a></p-link-pure
        >
        <p-link-pure [hideLabel]="true" [size]="'small'" [icon]="'none'"
          ><a href="https://www.porsche.com">With hideLabel and no icon</a>
          <p slot="subline">Some subline</p></p-link-pure
        >
      </div>

      <div class="playground light" title="should align label to the left">
        <p-link-pure [href]="'https:  //www.porsche.com'" [alignlabel]="'left'">Align-label left</p-link-pure>
        <p-link-pure [alignlabel]="'left'"><a href="https://www.porsche.com">Slotted align-label left</a></p-link-pure>
      </div>
      <div class="playground light" title="should align label to the left or right depending on viewport">
        <p-link-pure
          href="https://www.porsche.com"
          [alignlabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }"
        >
          With breakpoint customizable align-label
        </p-link-pure>
        <p-link-pure [alignlabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }">
          <a href="https://www.porsche.com">Slotted with breakpoint customizable align-label</a>
        </p-link-pure>
      </div>

      <div class="playground light" title="should render with stretched label">
        <p-link-pure [href]="'https:  //www.porsche.com'" [stretch]="true">Stretched icon left</p-link-pure>
        <p-link-pure [href]="'https:  //www.porsche.com'" [stretch]="true" [alignlabel]="'left'"
          >Stretched icon right</p-link-pure
        >
        <p-link-pure [stretch]="true"><a href="https://www.porsche.com">Slotted stretched icon left</a></p-link-pure>
        <p-link-pure [stretch]="true" [alignlabel]="'left'"
          ><a href="https://www.porsche.com">Slotted stretched icon right</a></p-link-pure
        >
      </div>
      <div class="playground light" title="should render with stretched label depending on viewport">
        <p-link-pure
          href="https://www.porsche.com"
          [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
          >Stretched depending on viewport</p-link-pure
        >
      </div>

      <div class="playground light" title="should not align label left or stretch if it has a subline">
        <p-link-pure [href]="'https:  //www.porsche.com'" [alignlabel]="'left'">
          With align-label and subline
          <p slot="subline">Some subline</p>
        </p-link-pure>
        <p-link-pure [href]="'https:  //www.porsche.com'" [stretch]="true">
          With strech and subline
          <p slot="subline">Some subline</p>
        </p-link-pure>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPureComponent {}
