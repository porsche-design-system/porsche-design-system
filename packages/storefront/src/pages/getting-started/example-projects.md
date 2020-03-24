# Example Projects
To enable a smooth start with the Porsche Design System we have created sample projects in all common frameworks.

These projects show the use of the Porsche Design System components and contain examples and solutions to demonstrate tests.

## Sample integration react
You can find the react example here [Sample integration react](https://github.com/porscheui/sample-integration-react.git)
### Prerequisites
* Access to Porsche UI or MyPorsche artifactory npm repository
* For MyPorsche artifactory replace `.npmrc` with `npmrc.myporsche`
* Check your authentification via <br>
`npm whoami --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/` <br>
or for MyPorsche <br>
`npm whoami --registry=https://porschedev.jfrog.io/porschedev/api/npm/public-npm/`

### Get the project up and running
* Clone the repository by executing <br>
`git clone https://github.com/porscheui/sample-integration-react.git`
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

### Reproduce on your own
To build your own application which is provided with the Porsche Design System follow these simple steps:

* Run `npx create-react-app .` to create a directory inside the current folder with the initial project structure called `my-app` 
* Create `.npmrc` file to tell npm from which registry you want to install the Porsche Design System package: <br>
  `always-auth = true`<br>
  `@porsche-design-system:registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/`<br>
  If you want to use the MyPorsche registry use instead:<br>
  `always-auth = true`<br>
  `registry = https://porschedev.jfrog.io/porschedev/api/npm/public-npm/`
* Install the Porsche Design System `npm install @porsche-design-system/components-react` <br>
For more detailed information about this step visit our [Start Coding](#/getting-started/start-coding) section

You are ready to start building your own application. To use at least one Porsche Design System component change the `src/App.js`, for example:
``` 
import React from 'react';
    import { PHeadline } from '@porsche-design-system/components-react';
    
    class App extends React.Component {
      constructor(props) {
        super(props);
      }
    
      render() {
        return (
          <div className="App">
            <PHeadline>My first App using Porsche Design System</PHeadline>
          </div>
        );
      }
    }
    
    export default App;
```

Run `npm start` and check if the components are displayed correctly.

### Test the application

**Jest** uses **jsdom**. It is not yet possible to render web components via jsdom. 
For this reason we have created mock´s for every Porsche Design System component.

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