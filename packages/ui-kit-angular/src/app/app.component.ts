import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <p-text>
        <b id="human-readable-browser-name"></b>
        <br>
        <span id="system-log"></span>
      </p-text>
      <hr>
      <p-headline [variant]="'headline-2'" [tag]="'h2'">Basic</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-marque&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-block">
            <p-marque></p-marque>
            <p-marque [trademark]="false"></p-marque>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-headline&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-block">
            <p-headline [variant]="'large-title'" [tag]="'h1'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-1'" [tag]="'h1'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-2'" [tag]="'h2'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-3'" [tag]="'h3'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-4'" [tag]="'h4'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-5'" [tag]="'h5'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-6'" [tag]="'h6'">The quick brown fox jumps over the lazy dog</p-headline>
          </div>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="5" [offset]="2">
          <div class="playground light spacing-block">
            <p-headline [variant]="'headline-3'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-3'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item size="5">
          <div class="playground dark spacing-block">
            <p-headline [variant]="'headline-3'" [theme]="'dark'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-3'" [theme]="'dark'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-headline>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-text&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-block">
            <p-text>The quick brown fox jumps over the lazy dog</p-text>
            <p-text [size]="'x-small'">The quick brown fox jumps over the lazy dog</p-text>
          </div>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="5" [offset]="2">
          <div class="playground light spacing-block">
            <p-text [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'brand'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'neutral-1'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'neutral-2'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'neutral-3'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'notification-success'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'notification-warning'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'notification-error'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
          </div>
        </p-grid-item>
        <p-grid-item size="5">
          <div class="playground dark spacing-block">
            <p-text [theme]="'dark'" [color]="'default'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'brand'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'neutral-1'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'neutral-2'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'neutral-3'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'notification-success'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'notification-warning'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'notification-error'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'inherit'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
          </div>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="10" [offset]="2">
          <div class="playground light spacing-block">
            <p-text [ellipsis]="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </p-text>
          </div>
          <div class="playground light spacing-block">
            <p-text>Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
              text</strong></p-text>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Action</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-button&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-button [variant]="'primary'">Some label</p-button>
            <p-button [variant]="'primary'" [disabled]="true">Some label</p-button>
            <p-button [variant]="'primary'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button>Some label</p-button>
            <p-button [disabled]="true">Some label</p-button>
            <p-button [loading]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button [variant]="'tertiary'">Some label</p-button>
            <p-button [variant]="'tertiary'" [disabled]="true">Some label</p-button>
            <p-button [variant]="'tertiary'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button [icon]="'phone'">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button>
          </div>
          <hr>
          <div class="playground light spacing-inline">
            <p-button [variant]="'primary'" [hideLabel]="true">Some label</p-button>
            <p-button [variant]="'primary'" [hideLabel]="true" [disabled]="true">Some label</p-button>
            <p-button [variant]="'primary'" [hideLabel]="true" [loading]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button [hideLabel]="true">Some label</p-button>
            <p-button [disabled]="true" [hideLabel]="true">Some label</p-button>
            <p-button [loading]="true" [hideLabel]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button [variant]="'tertiary'" [hideLabel]="true">Some label</p-button>
            <p-button [variant]="'tertiary'" [hideLabel]="true" [disabled]="true">Some label</p-button>
            <p-button [variant]="'tertiary'" [hideLabel]="true" [loading]="true">Some label</p-button>
          </div>
          <div class="playground light spacing-inline">
            <p-button [icon]="'phone'" [hideLabel]="true">Some label</p-button>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-button [variant]="'primary'" [theme]="'dark'">Some label</p-button>
            <p-button [variant]="'primary'" [theme]="'dark'" [disabled]="true">Some label</p-button>
            <p-button [variant]="'primary'" [theme]="'dark'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'">Some label</p-button>
            <p-button [theme]="'dark'" [disabled]="true">Some label</p-button>
            <p-button [theme]="'dark'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" [variant]="'tertiary'">Some label</p-button>
            <p-button [theme]="'dark'" [variant]="'tertiary'" [disabled]="true">Some label</p-button>
            <p-button [theme]="'dark'" [variant]="'tertiary'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" [icon]="'phone'">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing
            </p-button>
          </div>
          <hr>
          <div class="playground dark spacing-inline">
            <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'">Some label</p-button>
            <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'" [disabled]="true">Some label</p-button>
            <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" [hideLabel]="true">Some label</p-button>
            <p-button [theme]="'dark'" [hideLabel]="true" [disabled]="true">Some label</p-button>
            <p-button [theme]="'dark'" [hideLabel]="true" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" [hideLabel]="true" [variant]="'tertiary'">Some label</p-button>
            <p-button [theme]="'dark'" [hideLabel]="true" [variant]="'tertiary'" [disabled]="true">Some label</p-button>
            <p-button [theme]="'dark'" [hideLabel]="true" [variant]="'tertiary'" [loading]="true">Some label</p-button>
          </div>
          <div class="playground dark spacing-inline">
            <p-button [theme]="'dark'" [hideLabel]="true" [icon]="'phone'">Some label</p-button>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-button-pure&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-button-pure>Some label</p-button-pure>
            <p-button-pure [disabled]="true">Some label</p-button-pure>
            <p-button-pure [loading]="true">Some label</p-button-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-button-pure [hideLabel]="true">Some label</p-button-pure>
            <p-button-pure [hideLabel]="true" [disabled]="true">Some label</p-button-pure>
            <p-button-pure [hideLabel]="true" [loading]="true">Some label</p-button-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-button-pure [size]="'medium'">Medium</p-button-pure>
            <p-button-pure [size]="'inherit'" style="font-size: 48px;">Inherit</p-button-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-button-pure [weight]="'thin'">Thin</p-button-pure>
            <p-button-pure [weight]="'regular'">Regular</p-button-pure>
            <p-button-pure [weight]="'bold'">Bold</p-button-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-button-pure [icon]="'delete'">Some button with a custom icon</p-button-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-button-pure style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button-pure>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-button-pure [theme]="'dark'">Some label</p-button-pure>
            <p-button-pure [disabled]="true" [theme]="'dark'">Some label</p-button-pure>
            <p-button-pure [loading]="true" [theme]="'dark'">Some label</p-button-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-button-pure [hideLabel]="true" [theme]="'dark'">Some label</p-button-pure>
            <p-button-pure [hideLabel]="true" [disabled]="true" [theme]="'dark'">Some label</p-button-pure>
            <p-button-pure [hideLabel]="true" [loading]="true" [theme]="'dark'">Some label</p-button-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-button-pure [size]="'medium'" [theme]="'dark'">Medium</p-button-pure>
            <p-button-pure [size]="'inherit'" [theme]="'dark'" style="font-size: 48px;">Inherit</p-button-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-button-pure [weight]="'thin'" [theme]="'dark'">Thin</p-button-pure>
            <p-button-pure [weight]="'regular'" [theme]="'dark'">Regular</p-button-pure>
            <p-button-pure [weight]="'bold'" [theme]="'dark'">Bold</p-button-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-button-pure [icon]="'delete'" [theme]="'dark'">Some button with a custom icon</p-button-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-button-pure [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button-pure>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Content</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">
            &lt;p-text-list&gt;<br>
            &lt;p-text-list-item&gt;
          </p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-block">
            <p-text-list>
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
              <p-text-list-item>
                Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <p-text-list>
                  <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
                  <p-text-list-item>Lorem ipsum</p-text-list-item>
                </p-text-list>
              </p-text-list-item>
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
            </p-text-list>
          </div>
          <div class="playground light spacing-block">
            <p-text-list [listType]="'ordered'">
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
              <p-text-list-item>
                Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <p-text-list [listType]="'ordered'">
                  <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
                  <p-text-list-item>Lorem ipsum</p-text-list-item>
                </p-text-list>
              </p-text-list-item>
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
            </p-text-list>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-block">
            <p-text-list [theme]="'dark'">
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
              <p-text-list-item>
                Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <p-text-list [theme]="'dark'">
                  <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
                  <p-text-list-item>Lorem ipsum</p-text-list-item>
                </p-text-list>
              </p-text-list-item>
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
            </p-text-list>
          </div>
          <div class="playground dark spacing-block">
            <p-text-list [theme]="'dark'" [listType]="'ordered'" [color]="'inherit'" style="color: deeppink;">
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
              <p-text-list-item>
                Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <p-text-list [theme]="'dark'">
                  <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
                  <p-text-list-item>Lorem ipsum</p-text-list-item>
                </p-text-list>
              </p-text-list-item>
              <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
            </p-text-list>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Feedback</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-spinner&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-spinner [size]="'x-small'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [size]="'small'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [size]="'medium'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [size]="'large'" [allyLabel]="'Loading'"></p-spinner>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-spinner [theme]="'dark'" [size]="'x-small'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'small'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'medium'" [allyLabel]="'Loading'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'large'" [allyLabel]="'Loading'"></p-spinner>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Icon</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-icon&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-icon [name]="'filter'" [color]="'neutral-1'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'medium'" [color]="'neutral-2'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'neutral-3'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'brand'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'inherit'" aria-label="Filter icon" style="color: deeppink;"></p-icon>
            <p-icon [name]="'delete'" [size]="'large'" aria-label="Delete icon"></p-icon>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-icon [name]="'filter'" [theme]="'dark'" [color]="'neutral-1'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'medium'" [color]="'neutral-2'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'neutral-3'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'brand'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'inherit'" aria-label="Filter icon" style="color: deeppink;"></p-icon>
            <p-icon [name]="'delete'" [theme]="'dark'" [size]="'large'" aria-label="Delete icon"></p-icon>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Layout</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">
            &lt;p-grid&gt;<br>
            &lt;p-grid-item&gt;
          </p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-block">
            <p-grid>
              <p-grid-item [size]="12"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="1"></p-grid-item>
              <p-grid-item [size]="11"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="2"></p-grid-item>
              <p-grid-item [size]="10"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="3"></p-grid-item>
              <p-grid-item [size]="9"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="4"></p-grid-item>
              <p-grid-item [size]="8"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="5"></p-grid-item>
              <p-grid-item [size]="7"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="6"></p-grid-item>
              <p-grid-item [size]="6"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="7"></p-grid-item>
              <p-grid-item [size]="5"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="8"></p-grid-item>
              <p-grid-item [size]="4"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="9"></p-grid-item>
              <p-grid-item [size]="3"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="10"></p-grid-item>
              <p-grid-item [size]="2"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [size]="11"></p-grid-item>
              <p-grid-item [size]="1"></p-grid-item>
            </p-grid>
          </div>
          <div class="playground light spacing-block">
            <p-grid>
              <p-grid-item [offset]="1" [size]="11"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="2" [size]="10"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="3" [size]="9"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="4" [size]="8"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="5" [size]="7"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="6" [size]="6"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="7" [size]="5"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="8" [size]="4"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="9" [size]="3"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="10" [size]="2"></p-grid-item>
            </p-grid>
            <p-grid>
              <p-grid-item [offset]="11" [size]="1"></p-grid-item>
            </p-grid>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">
            &lt;p-flex&gt;<br>
            &lt;p-flex-item&gt;
          </p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-block">
            <p-flex>
              <p-flex-item [width]="'full'"></p-flex-item>
            </p-flex>
            <p-flex>
              <p-flex-item [offset]="'one-quarter'" [width]="'three-quarters'"></p-flex-item>
            </p-flex>
            <p-flex>
              <p-flex-item [offset]="'one-third'" [width]="'two-thirds'"></p-flex-item>
            </p-flex>
            <p-flex>
              <p-flex-item [offset]="'half'" [width]="'half'"></p-flex-item>
            </p-flex>
            <p-flex>
              <p-flex-item [offset]="'two-thirds'" [width]="'one-third'"></p-flex-item>
            </p-flex>
            <p-flex>
              <p-flex-item [offset]="'three-quarters'" [width]="'one-quarter'"></p-flex-item>
            </p-flex>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-headline [variant]="'headline-2'">Navigation</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-link&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://ui.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://ui.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://ui.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://ui.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://ui.porsche.com'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
          </div>
          <hr>
          <div class="playground light spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://ui.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://ui.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://ui.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://ui.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://ui.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://ui.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://ui.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://ui.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://ui.porsche.com'" [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
          </div>
          <hr>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://ui.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some
              label
            </p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://ui.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://ui.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some
              label
            </p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://ui.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label
            </p-link>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-pagination&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-block">
            <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1"></p-pagination>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-block">
            <p-pagination [theme]="'dark'" [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1"></p-pagination>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
