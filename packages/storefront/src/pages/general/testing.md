# Testing

One problem you might encounter while testing is, that the components get
lazily loaded. That means, that they might not be ready when your tests start
to access the elements.  
You can solve that by using the [componentsReady-function](helpers/components-ready)
 to know when all loading is finished.
 
Detailed information about tests in frameworks like [React](start-coding/react), Angular etc. can be found in the respective test projects

<TableOfContents></TableOfContents>

## Unit Tests

A simple Jasmine example could look like this:
```javascript
import { componentsReady } from '@porsche-design-system/components-js';

/*
 * the function to test which adds a porsche design system
 * component to the document (usually this is done by a
 * template engine of a framework)
 */

function addPText() {
  const element = document.createElement('p-text');
  element.innerText = 'Hello World';
  document.body.appendChild(element);
}

describe("The p-text", function() {
  /**
   * this test might fail, because the component is not
   * ready if it wasn't used before
   * in that case innerText would be empty string until
   * the component finished loading
   */
  it("should have content", function() {
    addPText();
    const element = document.querySelector('p-text');
    expect(element.innerText).toBe('Hello World');
    element.remove();
  });
 
  /**
   * this test should work, even if the component
   * still needs to be loaded, because the
   * componentsReady() function returns a promise
   * that resolves as soon as everything is ready
   */
  it("should have content", async function() {
    addPText();
    await componentsReady();
    const element = document.querySelector('p-text');
    expect(element.innerText).toBe('Hello World');
    element.remove();
  });

});
```

## E2E Tests

Usually E2E tests are robust enough that the lazy loading shouldn't cause
any issues. However, there are a lot of different setups for E2E tests.

If you face any problems, we would appreciate if you report them. We'll
do our best to find a solution.  
Also, it might be handy to know that all components get a `hydrated` class,
as soon as they are loaded and ready, that you can wait for. Waiting for the functionality is available in most E2E frameworks.  
Another option would be to make the `componentsReady` function available
in the browser and call it from the E2E tests to know when the page is
ready.

## Visual Regression Testing

For Visual Regression Testing we recommend waiting for all network traffic
to be finished. This should be handled by the Visual Regression Testing
tools you use.