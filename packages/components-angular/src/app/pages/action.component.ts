import { Component } from '@angular/core';

@Component({
  selector: 'app-action',
  template: `
    <p-headline [variant]="'headline-2'">Action</p-headline>
    <p-divider></p-divider>
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
        <p-divider></p-divider>
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
        <p-divider></p-divider>
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
        <p-divider></p-divider>
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
        <p-divider></p-divider>
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
          <p-button-pure [weight]="'semibold'">Semibold</p-button-pure>
          <p-button-pure [weight]="'bold'">Bold</p-button-pure>
        </div>
        <div class="playground light spacing-inline">
          <p-button-pure [icon]="'delete'">Some button with a custom icon</p-button-pure>
        </div>
        <div class="playground light spacing-inline">
          <p-button-pure style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button-pure>
        </div>
        <div class="playground light spacing-inline">
          <p-button-pure [theme]="'dark'" [weight]="'semibold'" [size]="'medium'">
            Some Label
            <p [slot]="'subline'">Some Subline</p>
          </p-button-pure>
          <p-button-pure [theme]="'dark'" [weight]="'semibold'" [size]="'medium'" disabled="true">
            Some Label
            <p [slot]="'subline'">Some Subline</p>
          </p-button-pure>
        </div>
        <p-divider></p-divider>
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
          <p-button-pure [weight]="'semibold'" [theme]="'dark'">Semibold</p-button-pure>
          <p-button-pure [weight]="'bold'" [theme]="'dark'">Bold</p-button-pure>
        </div>
        <div class="playground dark spacing-inline">
          <p-button-pure [icon]="'delete'" [theme]="'dark'">Some button with a custom icon</p-button-pure>
        </div>
        <div class="playground dark spacing-inline">
          <p-button-pure [theme]="'dark'" style="width: 240px;">Lorem ipsum dolor sit amet, consetetur sadipscing
          </p-button-pure>
        </div>
        <div class="playground dark spacing-inline">
          <p-button-pure [theme]="'dark'" [weight]="'semibold'" [size]="'medium'">
            Some Label
            <p [slot]="'subline'">Some Subline</p>
          </p-button-pure>
          <p-button-pure [theme]="'dark'" [weight]="'semibold'" [size]="'medium'" disabled="true">
            Some Label
            <p [slot]="'subline'">Some Subline</p>
          </p-button-pure>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
  `
})
export class ActionComponent {
}
