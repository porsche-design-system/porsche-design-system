# Porsche UI Kit

The Porsche UI Kit provides the design fundamentals for easily creating aesthetic and qualitative digital products. Ready to use as reusable Sketch libraries, coded React components or HTML and CSS elements. Everything built and tested following the Porsche quality standards and corporate design principles.

---

# Integrate with Vanilla JS

Assuming you have access to Porsche UI Artifactory and have following npm package `@porscheui/porsche-ui-kit` which provides native Web Components (Custom Elements) installed within your project.

Within your application it's necessary to include once a common Porsche UI Kit Stylesheet (which includes mainly font-face definitions) and a small web component loader script. Afterwards web components are available within your project and get lazy loaded whenever those are used.

Example integration, by creating and index.html with following content that is served by a web server.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Porsche UI Kit</title>
  <link rel="stylesheet" href="./node_modules/@porscheui/porsche-ui-kit/dist/porsche-ui-kit/porsche-ui-kit.css">
  <script src="./node_modules/@porscheui/porsche-ui-kit/dist/porsche-ui-kit/porsche-ui-kit.js"></script>
</head>
<body>
  <p-button-regular label="Some label"></p-button-regular>
  <p-icon icon="icon_search.min.svg" size="large" lazy={false}></p-icon>
  <p-loader></p-loader>
</body>
</html>
```

---

# Integrate with React

Assuming you have access to Porsche UI Artifactory and have following npm package `@porscheui/porsche-ui-kit` which provides native Web Components (Custom Elements) installed within your project.

With an application built using the `create-react-app script` the easiest way to include the component library is to import a common CSS 
file `porsche-ui-kit.css` and call `defineCustomElements(window)` from the `index.js` file.

### Example setup - index.js/index.tsx
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/@porscheui/porsche-ui-kit/dist/porsche-ui-kit/porsche-ui-kit.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { defineCustomElements } from '@porscheui/porsche-ui-kit/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
defineCustomElements(window);
```

Following the steps above will enable your web components to be used in React.

### Example usage - App.tsx
```
import React, {useEffect, useState, createRef} from 'react';
import './App.css';

const App: React.FC = () => {
  const myButton = createRef<HTMLPButtonRegularElement>();
  const [label, setLabel] = useState("Some label");

  useEffect(() => {
    console.log('myButton:', myButton.current);

    if (myButton.current) {
      myButton.current.addEventListener('onClicked', () => {
        alert('hello button');
      });
    }
  }, []);

  return (
    <div>
      <p-button-regular ref={myButton} label={label} />
      <p-icon icon="icon_search.min.svg" size="large" lazy={false} />
      <p-loader />
    </div>
  );
};

export default App;
```

---

# Integrate with Angular

Assuming you have access to Porsche UI Artifactory and have following npm package `@porscheui/porsche-ui-kit` which provides native Web Components (Custom Elements) installed within your project.

With an application built using Angular CLI, we need following steps to integrate Porsche UI Kit Web Components:

1. Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components
1. Call `defineCustomElements(window)` from `main.ts` (or some other appropriate place)


### Including the Custom Elements Schema
Including the `CUSTOM_ELEMENTS_SCHEMA` in the module allows the use of the web components in the HTML markup without the compiler producing errors. Here is an example of adding it to `AppModule`:

```
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### Calling defineCustomElements
`defineCustomElements()` needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@porscheui/porsche-ui-kit/dist/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
defineCustomElements(window);
```

### Import some common CSS
It's necessary to load a CSS file provided by Porsche UI Kit to ensure e.g. font-face are loaded correctly within your `styles.scss`:
```
@import '../node_modules/@porscheui/porsche-ui-kit/dist/porsche-ui-kit/porsche-ui-kit.css';
```

### Accessing components using ViewChild and ViewChildren
Once included, components could be referenced in your code, e.g. `app.component.ts` using `ViewChild` and `ViewChildren` as in the following example:

```
import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myButton') myButton: ElementRef<HTMLPButtonRegularElement>;

  label = "Some label";

  ngOnInit() {
    console.log('myButton:', this.myButton.nativeElement);

    this.myButton.nativeElement.addEventListener('onClicked', () => {
      alert('hello button');
    });
  }
}
```

… and the corresponding markup in e.g. `app.component.html`:

```
<div>
  <p-button-regular #myButton label="{{this.label}}"></p-button-regular>
  <p-icon icon="icon_search.min.svg" size="large" lazy={false}></p-icon>
  <p-loader></p-loader>
</div>

<router-outlet></router-outlet>
```