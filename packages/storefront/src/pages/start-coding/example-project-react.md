# Sample project integration react
You can find the repository of the react example project here [Sample integration react](https://github.com/porscheui/sample-integration-react.git)

## Requirements

To use the Porsche Design System in your React Application you have to consume private npm-packages. You can find a description on how to do it [here](#/start-coding/introduction)

---

## Get the project up and running
* Clone the repository by executing <br>
`git clone https://github.com/porscheui/sample-integration-react.git`
<br>
### npm
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

###yarn
* Install dependencies via `yarn install`
* Run tests via `yarn test`
* Run the application via `yarn start`
* Build the application via `yarn build`

---

## Reproduce on your own
To build your own application which is provided with the Porsche Design System follow these simple steps:

* Run `npx create-react-app .` to create a directory inside the current folder with the initial project structure called `my-app` 
* Install the Porsche Design System<br>
``` 
// install with npm:
npm install @porsche-design-system/components-react

// install with yarn:
yarn add @porsche-design-system/components-react
```

You are ready to start building your own application. The React wrappers for web components can be used like every other React 
component - even with Typescript support. 

The following setup is a standard React Scripts (Create React App) setup with SCSS support:

### Index file
``` 
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

``` 

### App file

Change your App file to use at least one Porsche Design System Component, for example:

``` 
import React from 'react';
import { PHeadline } from '@porsche-design-system/components-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}

export default App;
```

Run `npm start` or `yarn start` and check if the components are displayed correctly.

---

## Test the application

**Jest** uses **jsdom**. It is not yet possible to render web components via jsdom. 
For this reason we have created mock´s for every Porsche Design System component.


To ensure your tests dont fail, copy the `jest.mock()` function and keep a mock for every component you have used. Use this solution until **jsdom** provides support for **webcomponents**.

``` 
jest.mock('@porsche-design-system/components-react', () => ({

       PHeadline: props => <mock-PHeadline>{props.children}</mock-PHeadline>,
       PIcon: () => <mock-PIcon></mock-PIcon>,
       PButton: props => <button>{props.children}</button>,
       PButtonPure: props => <button>{props.children}</button>,
       PGrid: props => <mock-PGrid>{props.children}</mock-PGrid>,
       PGridItem: props => <mock-PGridItem>{props.children}</mock-PGridItem>,
       PFlex: props => <mock-PFlex>{props.children}</mock-PFlex>,
       PFlexItem: props => <mock-PFlexItem>{props.children}</mock-PFlexItem>,
       PSelectWrapper: props => <mock-PSelectWrapper>{props.children}</mock-PSelectWrapper>,
       PCheckboxWrapper: props => <mock-PCheckboxWrapper>{props.children}</mock-PCheckboxWrapper>,
       PRadioButtonWrapper: props => <mock-PRadioButtonWraper>{props.children}</mock-PRadioButtonWraper>,
       PTextareaWrapper: () => <mock-PTextareaWrapper></mock-PTextareaWrapper>,
       PTextFieldWrapper: props => <mock-PTextFieldWrapper>{props.children}</mock-PTextFieldWrapper>,
       PLink: props => {
           if (props.href) {
               return <a href={props.href}>{props.children}</a>
           }
           return <mock-PLink>{props.children}</mock-PLink>
       },
       PLinkPure: props => {
           if (props.href) {
               return <a href={props.href}>{props.children}</a>
           }
           return <mock-PLinkPure>{props.children}</mock-PLinkPure>
       },
       PSpinner: () => <mock-PSpinner></mock-PSpinner>,
   
       /* PPagination uses the onPageChange Event, which you could test. Unfortunately Jest and JS-Dom have to many Restrictions to trigger a Mocked Custom Event.
       * If you Use a different Testing-Framework which also requires mocking you can use triggerCustomEvent.js as mock for PPagination */
   
       PPagination: props => <mock-PPagination>{props.children}</mock-PPagination>,
   })); 
```
You find detailed informations on how to use mock functions in jest [here](https://jestjs.io/docs/en/mock-functions.html).
<br>
<br>
We also provide test examples in our example-project. You can find them in the `App.test.js`.

