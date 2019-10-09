# Porsche UI Kit Angular
Angular wrappers for Porsche UI Kit web components package.  


## Installation
``` 
// install with npm:
npm install @porsche-ui/ui-kit-angular

// install with yarn:
yarn add @porsche-ui/ui-kit-angular
```

## Usage
The Angular wrapper of web components can be used like every other Angular library. 

After adding `@porsche-ui/ui-kit-angular` package to your project, import the `PorscheUIKitModule` to your root module and the needed global (S)CSS. 
The following setup is a standard Angular CLI project with SCSS support:

#### App module
``` 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheUIKitModule } from '@porsche-ui/ui-kit-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PorscheUIKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

``` 

#### App component
``` 
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <p-headline variant="headline-1">Headline</p-headline>
    </div>
  `,
  styles: []
})
export class AppComponent {}
``` 

#### Load CSS
In your `styles.scss` import Porsche UI Kit stylesheet.

``` 
@import "~@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css";
``` 