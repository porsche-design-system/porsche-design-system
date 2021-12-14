# Spinner

<TableOfContents></TableOfContents>

## When to use
  • Use a Spinner when the user has to wait for more than 1 second.   
  • Use a Spinner either stand-alone or within components (e.g. in Buttons to indicate progress after clicking "save").

---

## Behavior

### Screen blocking
Using a spinner for only parts of a screen or within dedicated components usually means that the user is able to cancel the operation, for example by clicking somewhere else. If the user is not supposed to start another activity, you should block the whole screen. This can be done using a full size block overlay for the whole screen and placing the loader on top.

* Light Theme: Blocking layer in Porsche Light, 90% opacity
* Dark Theme: Blocking layer in Porsche Dark, 90% opacity


## Usage

### Spinner position
Whenever used as an independent item within a page or module, the spinner should always be placed vertically and horizontally centered within the referring area. Within a dedicated component, the placement of the spinner is determined by the respective element it replaces or accompanies.

### Component blocking
If a spinner is triggered by an interaction within a component, it is recommended to disable the component while the spinner is visible.

### With text label

Including text can be helpful to improve clarity. Keep it simple by only explaining
**why** the user is waiting. Avoid using texts such as "Don't click again" to prevent
the user from clicking twice on a shopping button in order to not create an extra order.
A loading animation should always be a user-friendly helper, not a threat.

* For small sizes, you should use copytext.
* For larger Spinner sizes, you can use any additional size, depending on your needs and the available space.
* Text must always be placed beneath or on the right side of the loader.


<div style="background:#F2F2F2; width:100%; margin-top: 64px; padding-top: 32px; padding-left: 42px; padding-bottom: 42px;">
    <p-headline variant="headline-3" tag="h3" style="margin-bottom: 24px;">Examples</p-headline>
    <img src="./assets/spinner-blocking.png" alt=""/>
</div>

---

## Do's & Don'ts

### Spinner overload
Using too much spinners at the same time time or using too much of them within a page or application in general can also create user frustration. This should be avoided by carefully considering where a loader makes sense and which loader type is the best.

### Delays of more than 10 seconds
A spinner offers feedback about a loading state, but not on how long it will take for the loading to be finished. Fostering the user to stare at a spinning wheel for more than 10 seconds will most likely make the users get impatient, wandering around on your website, abandon their current task, or, worst case, close your application. So if the result takes more than 10 seconds to appear, you should better provide a progress bar showing the estimated waiting time.