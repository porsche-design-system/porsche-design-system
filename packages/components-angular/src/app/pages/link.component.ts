/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link',
  template: `
    <div class="playground light auto-layout" title="should render primary with label only">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [variant]="'primary'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render primary with label and icon">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'primary'" [icon]="'arrow-right'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render primary without label">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'primary'" [hideLabel]="true" [icon]="'arrow-right'">
        <a [href]="'https://www.porsche.com'">Some label</a>
      </p-link>
    </div>

    <div class="playground light auto-layout" title="should render primary as default with label only">
      <p-link [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render primary as default with label and icon">
      <p-link [href]="'https://www.porsche.com'" [icon]="'arrow-right'">Some label</p-link>
      <p-link [icon]="'arrow-right'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render primary as default without label">
      <p-link [href]="'https://www.porsche.com'" [hideLabel]="true" [icon]="'arrow-right'">Some label</p-link>
      <p-link [hideLabel]="true" [icon]="'arrow-right'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render secondary with label only">
      <p-link [variant]="'secondary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [variant]="'secondary'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render secondary with label and icon">
      <p-link [variant]="'secondary'" [href]="'https://www.porsche.com'" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'secondary'" [icon]="'arrow-right'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light auto-layout" title="should render secondary without label">
      <p-link [variant]="'secondary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'secondary'" [hideLabel]="true" [icon]="'arrow-right'"
        ><a [href]="'https://www.porsche.com'">Some label</a></p-link
      >
    </div>

    <div
      class="playground light auto-layout"
      title="should render secondary if tertiary prop is set (deprecated) with label only"
    >
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [variant]="'tertiary'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div
      class="playground light auto-layout"
      title="should render secondary if tertiary prop is set (deprecated) with label and icon"
    >
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'tertiary'" [icon]="'arrow-right'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div
      class="playground light auto-layout"
      title="should render secondary if tertiary prop is set (deprecated) without label"
    >
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [icon]="'arrow-right'">Some label</p-link>
      <p-link [variant]="'tertiary'" [hideLabel]="true" [icon]="'arrow-right'"
        ><a [href]="'https://www.porsche.com'">Some label</a></p-link
      >
    </div>

    <div class="playground light auto-layout" title="should render primary with responsive label">
      <p-link
        [variant]="'primary'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [icon]="'arrow-right'"
        [href]="'https://www.porsche.com'"
      >
        Some label
      </p-link>
    </div>

    <div class="playground light auto-layout" title="should render link with specific icon">
      <p-link [icon]="'phone'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [iconSource]="'./assets/icon-custom-kaixin.svg'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [icon]="'phone'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [iconSource]="'./assets/icon-custom-kaixin.svg'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [icon]="'phone'" [variant]="'secondary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [iconSource]="'./assets/icon-custom-kaixin.svg'" [variant]="'secondary'" [href]="'https://www.porsche.com'"
        >Some label
      </p-link>
    </div>

    <div class="playground light auto-layout" title="should render with multiline label with icon">
      <p-link style="width: 15rem" [icon]="'arrow-right'" [href]="'https://www.porsche.com'"
        >Lorem ipsum dolor sit amet, consetetur sadipscing
      </p-link>
      <p-link style="width: 15rem" [icon]="'arrow-right'">
        <a [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
      </p-link>
    </div>

    <div class="playground light auto-layout" title="should render with multiline label without icon">
      <p-link style="width: 15rem" [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
      <p-link style="width: 15rem">
        <a [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
      </p-link>
    </div>

    <div class="playground light auto-layout" title="should render with centered text/icon if set to 100% width">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" style="width: 100%">Some label</p-link>
      <p-link [variant]="'primary'" style="width: 100%"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
      <p-link [variant]="'primary'" [icon]="'arrow-right'" [href]="'https://www.porsche.com'" style="width: 100%">Some label</p-link>
      <p-link [variant]="'primary'" [icon]="'arrow-right'" style="width: 100%"
        ><a [href]="'https://www.porsche.com'">Some label</a></p-link
      >
      <p-link [variant]="'primary'" [hideLabel]="true" [icon]="'arrow-right'" [href]="'https://www.porsche.com'" style="width: 100%"
        >Some label
      </p-link>
      <p-link [variant]="'primary'" [hideLabel]="true" [icon]="'arrow-right'" style="width: 100%"
        ><a [href]="'https://www.porsche.com'">Some label</a></p-link
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {}
