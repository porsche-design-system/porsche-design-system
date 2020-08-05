import { Component } from '@angular/core';

@Component({
  selector: 'page-text-list',
  template: `
    <div class="playground light" title="should show unordered text list on light background">
      <p-text-list>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list>
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show unordered text list on dark background">
      <p-text-list theme="dark">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list theme="dark">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list numbered on light background">
      <p-text-list list-type="ordered">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list list-type="ordered">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list numbered on dark background">
      <p-text-list list-type="ordered" theme="dark">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list list-type="ordered" theme="dark">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground light" title="should show ordered text list alphabetically on light background">
      <p-text-list list-type="ordered" order-type="alphabetically">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list list-type="ordered" order-type="alphabetically">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>

    <div class="playground dark" title="should show ordered text list alphabetically on dark background">
      <p-text-list list-type="ordered" order-type="alphabetically" theme="dark">
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
        <p-text-list-item>The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
          <p-text-list list-type="ordered" order-type="alphabetically" theme="dark">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
            </p-text-list-item>
          </p-text-list>
        </p-text-list-item>
        <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      </p-text-list>
    </div>
  `
})
export class TextListComponent {
}
