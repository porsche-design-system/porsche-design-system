import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-prefixed',
  template: `
    <p-grid p-grid>
      <p-grid-item p-grid-item size="6">
        <p-headline>Default Components</p-headline>

        <div class="playground light" title="should render prefixed default button">
          <p-button>Some label</p-button>
        </div>

        <div class="playground light" title="should render prefixed default button-pure">
          <p-button-pure>Some label</p-button-pure>
        </div>

        <div class="playground light" title="should render prefixed default checkbox-wrapper">
          <p-checkbox-wrapper label="Some label">
            <input type="checkbox" />
          </p-checkbox-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default radio-button-wrapper">
          <p-radio-button-wrapper label="Some label">
            <input type="radio" />
          </p-radio-button-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default select-wrapper">
          <p-select-wrapper label="Some label">
            <select>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </p-select-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default text-field-wrapper">
          <p-text-field-wrapper label="Some label">
            <input type="text" />
          </p-text-field-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default textarea-wrapper">
          <p-textarea-wrapper label="Some label">
            <textarea></textarea>
          </p-textarea-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default fieldset-wrapper">
          <p-fieldset-wrapper label="Some label"></p-fieldset-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default content-wrapper">
          <p-content-wrapper>
            <p>Some content</p>
          </p-content-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default divider">
          <p-divider></p-divider>
        </div>

        <div class="playground light" title="should render prefixed default headline">
          <p-headline>The quick brown fox jumps over the lazy dog</p-headline>
        </div>

        <div class="playground light" title="should render prefixed default text">
          <p-text>The quick brown fox jumps over the lazy dog</p-text>
        </div>

        <div class="playground light" title="should render prefixed default text-list">
          <p-text-list>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          </p-text-list>
        </div>

        <div class="playground light" title="should render prefixed default icon">
          <p-icon></p-icon>
        </div>

        <div class="playground light" title="should render prefixed default link">
          <p-link href="https://www.porsche.com">Some label</p-link>
        </div>

        <div class="playground light" title="should render prefixed default link-pure">
          <p-link-pure href="https://www.porsche.com">Some label</p-link-pure>
        </div>

        <div class="playground light" title="should render prefixed default link-social">
          <p-link-social href="https://www.porsche.com" icon="logo-facebook">Some label</p-link-social>
        </div>

        <div class="playground light" title="should render prefixed default marque">
          <p-marque></p-marque>
        </div>

        <div class="playground light" title="should render prefixed default pagination">
          <p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
        </div>

        <div class="playground light" title="should render prefixed default spinner">
          <p-spinner></p-spinner>
        </div>

        <div class="playground light" title="should render prefixed default flex">
          <p-flex>
            <p-flex-item><p>1</p></p-flex-item>
            <p-flex-item><p>2</p></p-flex-item>
          </p-flex>
        </div>

        <div class="playground light" title="should render prefixed default grid">
          <p-grid>
            <p-grid-item size="6"></p-grid-item>
            <p-grid-item size="6"></p-grid-item>
          </p-grid>
        </div>
      </p-grid-item>

      <p-grid-item p-grid-item size="6">
        <my-prefix-p-headline p-headline>Prefixed Components</my-prefix-p-headline>

        <div class="playground light" title="should render prefixed default button">
          <my-prefix-p-button p-button>Some label</my-prefix-p-button>
        </div>

        <div class="playground light" title="should render prefixed default button-pure">
          <my-prefix-p-button-pure p-button-pure>Some label</my-prefix-p-button-pure>
        </div>

        <div class="playground light" title="should render prefixed default checkbox-wrapper">
          <my-prefix-p-checkbox-wrapper p-checkbox-wrapper label="Some label">
            <input type="checkbox" />
          </my-prefix-p-checkbox-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default radio-button-wrapper">
          <my-prefix-p-radio-button-wrapper p-radio-button-wrapper label="Some label">
            <input type="radio" />
          </my-prefix-p-radio-button-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default select-wrapper">
          <my-prefix-p-select-wrapper p-select-wrapper label="Some label">
            <select>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </my-prefix-p-select-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default text-field-wrapper">
          <my-prefix-p-text-field-wrapper p-text-field-wrapper label="Some label">
            <input type="text" />
          </my-prefix-p-text-field-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default textarea-wrapper">
          <my-prefix-p-textarea-wrapper p-textarea-wrapper label="Some label">
            <textarea></textarea>
          </my-prefix-p-textarea-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default fieldset-wrapper">
          <my-prefix-p-fieldset-wrapper p-fieldset-wrapper label="Some label"></my-prefix-p-fieldset-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default content-wrapper">
          <my-prefix-p-content-wrapper p-content-wrapper>
            <p>Some content</p>
          </my-prefix-p-content-wrapper>
        </div>

        <div class="playground light" title="should render prefixed default divider">
          <my-prefix-p-divider p-divider></my-prefix-p-divider>
        </div>

        <div class="playground light" title="should render prefixed default headline">
          <my-prefix-p-headline p-headline>The quick brown fox jumps over the lazy dog</my-prefix-p-headline>
        </div>

        <div class="playground light" title="should render prefixed default text">
          <my-prefix-p-text p-text>The quick brown fox jumps over the lazy dog</my-prefix-p-text>
        </div>

        <div class="playground light" title="should render prefixed default text-list">
          <my-prefix-p-text-list p-text-list>
            <my-prefix-p-text-list-item p-text-list-item
              >The quick brown fox jumps over the lazy dog</my-prefix-p-text-list-item
            >
          </my-prefix-p-text-list>
        </div>

        <div class="playground light" title="should render prefixed default icon">
          <my-prefix-p-icon p-icon></my-prefix-p-icon>
        </div>

        <div class="playground light" title="should render prefixed default link">
          <my-prefix-p-link p-link href="https://www.porsche.com">Some label</my-prefix-p-link>
        </div>

        <div class="playground light" title="should render prefixed default link-pure">
          <my-prefix-p-link-pure p-link-pure href="https://www.porsche.com">Some label</my-prefix-p-link-pure>
        </div>

        <div class="playground light" title="should render prefixed default link-social">
          <my-prefix-p-link-social p-link-social href="https://www.porsche.com" icon="logo-facebook"
            >Some label</my-prefix-p-link-social
          >
        </div>

        <div class="playground light" title="should render prefixed default marque">
          <my-prefix-p-marque p-marque></my-prefix-p-marque>
        </div>

        <div class="playground light" title="should render prefixed default pagination">
          <my-prefix-p-pagination
            p-pagination
            total-items-count="500"
            items-per-page="25"
            active-page="1"
          ></my-prefix-p-pagination>
        </div>

        <div class="playground light" title="should render prefixed default spinner">
          <my-prefix-p-spinner p-spinner></my-prefix-p-spinner>
        </div>

        <div class="playground light" title="should render prefixed default flex">
          <my-prefix-p-flex p-flex>
            <my-prefix-p-flex-item p-flex-item><p>1</p></my-prefix-p-flex-item>
            <my-prefix-p-flex-item p-flex-item><p>2</p></my-prefix-p-flex-item>
          </my-prefix-p-flex>
        </div>

        <div class="playground light" title="should render prefixed default grid">
          <my-prefix-p-grid p-grid>
            <my-prefix-p-grid-item p-grid-item size="6"></my-prefix-p-grid-item>
            <my-prefix-p-grid-item p-grid-item size="6"></my-prefix-p-grid-item>
          </my-prefix-p-grid>
        </div>
      </p-grid-item>
    </p-grid>
  `,
  styles: [
    `
      p-flex-item p,
      my-prefix-p-flex-item p {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 4px 2vw;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
      }

      p-flex-item:nth-child(1n) p,
      my-prefix-p-flex-item:nth-child(1n) p {
        background-color: skyblue;
      }

      p-flex-item:nth-child(2n) p,
      my-prefix-p-flex-item:nth-child(2n) p {
        background-color: deepskyblue;
      }
    `
  ]
})
export class OverviewComponent {}
