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
            <p-headline [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-1'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-2'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-3'">The quick brown fox jumps over the lazy dog</p-headline>
            <p-headline [variant]="'headline-4'">The quick brown fox jumps over the lazy dog</p-headline>
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
            <p-text [color]="'neutral-contrast-high'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'neutral-contrast-medium'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [color]="'neutral-contrast-low'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
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
            <p-text [theme]="'dark'" [color]="'neutral-contrast-high'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'neutral-contrast-medium'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
            <p-text [theme]="'dark'" [color]="'neutral-contrast-low'" style="color: deeppink;">The quick brown fox jumps over the lazy dog</p-text>
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
      <p-headline [variant]="'headline-2'">Feedback</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-spinner&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-spinner [size]="'small'"></p-spinner>
            <p-spinner [size]="'medium'"></p-spinner>
            <p-spinner [size]="'large'"></p-spinner>
            <p-spinner [size]="'inherit'" style="width: 24px;"></p-spinner>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-spinner [theme]="'dark'" [size]="'small'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'medium'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'large'"></p-spinner>
            <p-spinner [theme]="'dark'" [size]="'inherit'" style="width: 24px;"></p-spinner>
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
            <p-icon [name]="'filter'" [color]="'neutral-contrast-high'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'medium'" [color]="'neutral-contrast-medium'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'neutral-contrast-low'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'brand'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [size]="'large'" [color]="'inherit'" aria-label="Filter icon" style="color: deeppink;"></p-icon>
            <p-icon [name]="'delete'" [size]="'large'" aria-label="Delete icon"></p-icon>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-icon [name]="'filter'" [theme]="'dark'" [color]="'neutral-contrast-high'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'medium'" [color]="'neutral-contrast-medium'" aria-label="Filter icon"></p-icon>
            <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'neutral-contrast-low'" aria-label="Filter icon"></p-icon>
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
            <p-link [variant]="'primary'" [href]="'https://designsystem.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://designsystem.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://designsystem.porsche.com'">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
          </div>
          <hr>
          <div class="playground light spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <div class="playground light spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true">Some label</p-link>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'" [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
          </div>
          <hr>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'primary'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some
              label
            </p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [href]="'https://designsystem.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [variant]="'tertiary'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some
              label
            </p-link>
          </div>
          <div class="playground dark spacing-inline">
            <p-link [icon]="'phone'" [href]="'https://designsystem.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label
            </p-link>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-link-pure&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground light spacing-inline">
            <p-link-pure [href]="'https://designsystem.porsche.com'">Some label</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [hideLabel]="true" [href]="'https://designsystem.porsche.com'">Some label</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [size]="'medium'" [href]="'https://designsystem.porsche.com'">Medium</p-link-pure>
            <p-link-pure [size]="'inherit'" [href]="'https://designsystem.porsche.com'" style="font-size: 48px;">Inherit</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [weight]="'thin'" [href]="'https://designsystem.porsche.com'">Thin</p-link-pure>
            <p-link-pure [weight]="'regular'" [href]="'https://designsystem.porsche.com'">Regular</p-link-pure>
            <p-link-pure [weight]="'bold'" [href]="'https://designsystem.porsche.com'">Bold</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [active]="true" [href]="'https://designsystem.porsche.com'">Some label</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [icon]="'phone'" [href]="'https://designsystem.porsche.com'">Some link with a custom icon</p-link-pure>
          </div>
          <div class="playground light spacing-inline">
            <p-link-pure [href]="'https://designsystem.porsche.com'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link-pure>
          </div>
          <hr>
        </p-grid-item>
        <p-grid-item [size]="5">
          <div class="playground dark spacing-inline">
            <p-link-pure [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [hideLabel]="true" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [size]="'medium'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Medium</p-link-pure>
            <p-link-pure [size]="'inherit'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'" style="font-size: 48px;">Inherit</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [weight]="'thin'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Thin</p-link-pure>
            <p-link-pure [weight]="'regular'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Regular</p-link-pure>
            <p-link-pure [weight]="'bold'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Bold</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [active]="true" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some label</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [icon]="'phone'" [href]="'https://designsystem.porsche.com'" [theme]="'dark'">Some link with a custom icon</p-link-pure>
          </div>
          <div class="playground dark spacing-inline">
            <p-link-pure [href]="'https://designsystem.porsche.com'" [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link-pure>
          </div>
          <hr>
        </p-grid-item>
      </p-grid>
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
      <p-headline [variant]="'headline-2'">Form</p-headline>
      <hr>
      <p-grid>
        <p-grid-item [size]="2">
          <p-headline [variant]="'headline-4'" tag="h4">&lt;p-checkbox-wrapper&gt;</p-headline>
        </p-grid-item>
        <p-grid-item [size]="10">
          <div class="playground light spacing-inline">
            <p-checkbox-wrapper [label]="'Some label'">
              <input type="checkbox" name="some-name"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'">
              <input type="checkbox" name="some-name" checked="checked"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="true">
              <input type="checkbox" name="some-name"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="true">
              <input type="checkbox" name="some-name" checked="checked"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'" [indeterminate]="true">
              <input type="checkbox" name="some-name"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'" [indeterminate]="true">
              <input type="checkbox" name="some-name" checked="checked"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'">
              <input type="checkbox" name="some-name" disabled="disabled"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'">
              <input type="checkbox" name="some-name" checked="checked" disabled="disabled"/>
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error validation message.'">
              <input type="checkbox" name="some-name" />
            </p-checkbox-wrapper>
            <p-checkbox-wrapper [state]="'error'">
              <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
              <input type="checkbox" name="some-name" />
              <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
            </p-checkbox-wrapper>
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
