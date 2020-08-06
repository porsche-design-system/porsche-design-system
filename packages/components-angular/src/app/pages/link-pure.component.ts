import { Component } from '@angular/core';

@Component({
  selector: 'page-link-pure',
  styles: [`
    p-link-pure:not(:last-child) {
      margin-right: 8px;
    }
  `],
  template: `
    <div class="playground light" title="should render with label">
      <p-link-pure href="https://www.porsche.com">Some label</p-link-pure>
      <p-link-pure><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render with label on dark background">
      <p-link-pure href="https://www.porsche.com" theme="dark">Some label</p-link-pure>
      <p-link-pure theme="dark"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>


    <div class="playground light" title="should render without label">
      <p-link-pure href="https://www.porsche.com" hide-label="true">Some label</p-link-pure>
      <p-link-pure hide-label="true"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>
    <div class="playground dark" title="should render without label on dark background">
      <p-link-pure href="https://www.porsche.com" hide-label="true" theme="dark">Some label</p-link-pure>
      <p-link-pure hide-label="true" theme="dark"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>


    <div class="playground light" title="should render with responsive label">
      <p-link-pure href="https://www.porsche.com"
                   hide-label="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}">Some label
      </p-link-pure>
      <p-link-pure href="https://www.porsche.com"
                   hide-label="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}">Some label
        <p slot="subline">Some subline</p>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different size">
      <p-link-pure href="https://www.porsche.com" size="x-small">Some label</p-link-pure>
      <p-link-pure size="x-small"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br>
      <p-link-pure href="https://www.porsche.com" size="small">Some label</p-link-pure>
      <p-link-pure size="small"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br>
      <p-link-pure href="https://www.porsche.com" size="medium">Some label</p-link-pure>
      <p-link-pure size="medium"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br>
      <p-link-pure href="https://www.porsche.com" size="large">Some label</p-link-pure>
      <p-link-pure size="large"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br>
      <p-link-pure href="https://www.porsche.com" size="x-large">Some label</p-link-pure>
      <p-link-pure size="x-large"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <br>
      <p-link-pure href="https://www.porsche.com" size="inherit" style="font-size: 48px;">Some label</p-link-pure>
      <p-link-pure size="inherit" style="font-size: 48px;"><a href="https://www.porsche.com">Some label</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with responsive size">
      <p-link-pure href="https://www.porsche.com"
                   size="{'base': 'x-small', 'xs': 'small', 's': 'medium', 'm': 'large', 'l': 'x-large', 'xl': 'inherit'}"
                   style="font-size: 48px;">Some label
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with different weight">
      <p-link-pure href="https://www.porsche.com" weight="thin">Some label</p-link-pure>
      <p-link-pure weight="thin"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure href="https://www.porsche.com" weight="regular">Some label</p-link-pure>
      <p-link-pure weight="regular"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure href="https://www.porsche.com" weight="bold">Some label</p-link-pure>
      <p-link-pure weight="bold"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with active state">
      <p-link-pure href="https://www.porsche.com" active="true">Some label</p-link-pure>
      <p-link-pure active="true"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with specific icon">
      <p-link-pure href="https://www.porsche.com" icon="phone">Some label</p-link-pure>
      <p-link-pure href="https://www.porsche.com" icon-source="assets/icon-custom-kaixin.svg">Some label</p-link-pure>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-link-pure href="https://www.porsche.com" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur
        sadipscing
      </p-link-pure>
      <p-link-pure style="width: 240px;"><a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur
        sadipscing</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with custom clickable area">
      <p-link-pure href="https://www.porsche.com" style="padding: 1rem;">Some label</p-link-pure>
      <p-link-pure href="https://www.porsche.com" hide-label="true" style="padding: 1rem;">Some label</p-link-pure>
      <p-link-pure style="padding: 1rem;"><a href="https://www.porsche.com">Some label</a></p-link-pure>
      <p-link-pure hide-label="true" style="padding: 1rem;"><a href="https://www.porsche.com">Some label</a>
      </p-link-pure>
    </div>

    <div class="playground light" title="should render with explicit anchor tag">
      <p-link-pure><a href="https://www.porsche.com" id="test-focus-state">Some label</a></p-link-pure>
    </div>

    <div class="playground light" title="should render with subline">
      <p-link-pure href="https://www.porsche.com" size="small">Some label<p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure href="https://www.porsche.com" size="medium">Some label<p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure href="https://www.porsche.com" size="large">Some label<p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure href="https://www.porsche.com" size="x-large">Some label<p slot="subline">Some subline</p>
      </p-link-pure>
      <p-link-pure size="large"><a href="https://www.porsche.com">Some label</a>
        <p slot="subline">Some subline</p></p-link-pure>
      <a href="#">
        <p-link-pure size="large">Some label<p slot="subline">Some subline</p></p-link-pure>
      </a>
    </div>
  `
})
export class LinkPureComponent {
}
