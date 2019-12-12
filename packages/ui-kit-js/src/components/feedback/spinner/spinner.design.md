# Spinner

When it comes to unavoidable moments when the user has to wait for more than 1 second (for example due to technical processing of information or requests) you should bridge it with a good user feedback in order not to leave the user uncertain about what's happening, to avoid a high bounce rate and to obtain a positive impression of your website or application.

For ongoing operations between 2-10 seconds where the loading progress cannot be determined use a **Spinner** (looped indicator) to inform the user about an ongoing operation. Use it either stand-alone (for example as page loader) or within components, such as in Buttons to indicate progress after clicking "save".

---

## Sizes

The Spinner `medium` and `large` adjust their size automatically based on the responsive breakpoint.


| Size                      | Example                            | Recommended…                  |
|---------------------------|-------------------------|-------------------------------------------------|
| **Small**           |   <p-spinner size="small"></p-spinner>    | …for in-component loaders and also for module or page loading in small breakpoints. |
| **Medium / Large**     |   <p-spinner size="medium"></p-spinner><p-spinner size="large"></p-spinner>  | …for module or page loading, optionally accompanied by a text label.     |

---

## Variants

### With text label

It can be helpful to include text to improve clarity. Keep it simple by only explaining
**why** the user is waiting. Avoid using texts such as "Don't click again", for example to prevent
the user from clicking twice on a shopping button in order not to create an extra order.
A loading animation should always be a user-friendly helper, not a threat.

* For Small size, you should use copytext.
* For larger Spinner sizes, you can use any additional size, depending on your needs and the available space.
* Text must always be placed beneath or on the right side of the loader.

---

## Usage

### Spinner position
Whenever used as an independent item within a page or module, the Spinner should always be placed vertically and horizontally centered within the referring area. Within a dedicated component, the placement of the Spinner is determined by the respective element it replaces or accompanies.

### Component blocking
If a Spinner is triggered by an interaction with a component, it is recommended to disable the component while the spinner is visible.

### Screen blocking
Using a Spinner for parts of a screen or within dedicated components usually means that the user is able to cancel the operation, for example by clicking somewhere else. If the user is not supposed to start another activity, you should block the screen. This can be done by using a full size block overlay for the whole screen and placing
the loader on top:

* Light Theme: Blocking layer in Porsche Light, 90% opacity
* Dark Theme: Blocking layer in Porsche Dark, 90% opacity

---

<div style="background:#F2F2F2; width:100%; margin-top: 64px; padding-top: 32px; padding-left: 42px; padding-bottom: 42px;">
    <p-headline variant="headline-3" tag="h3" style="margin-bottom: 24px;">Examples</p-headline>
    <img src="./assets/spinner-blocking.png" alt=""/>
</div>

---

## Don'ts

### Spinner overload
Using too much Spinners at a time or within a page or application in general can also create user frustration. This should be avoided by carefully considering where a loader makes sense and which loader type is best suited.

### Delays of more than 10 seconds
A Spinner offers feedback that the system is working, but not on how long it will take. Fostering the user to stare at a spinning wheel for more than 10 seconds will most likely make the users get impatient, wandering around on your website, abandon their current task, or, worst case, close your application. So if the result takes more than 10 seconds to appear, you should better provide a progress bar showing the estimated waiting time.