# Spinner

## General information

It's important for a good UX to give the user feedback about what's happening.
Especially when it comes to unavoidable moments when the user has to wait,
for example due to technical processing of information or requests, you should
never leave the user uncertain about what's happening.

Always remember that the user's wait time begins with initiating an action,
clicking on a button for example. Whenever this causes delays of more than 1 second,
you should bridge it with a good user feedback in order not to leave the user
uncertain about what's happening, to avoid a high bounce rate and to obtain a positive
impression of your website or application.

### Spinner
A looped indicator (spinner) is used to inform the user about an ongoing operation
where the loading progress cannot be determined. Usually, spinners are recommended
to be used for delays of 2-10 seconds.

The Porsche UI Kit provides a spinner that can be used either stand-alone
(for example as page loaders) or within components, such as in buttons to
indicate progress after clicking "save".


---

## Style variations

### Spinner sizes
Depending on your need you can choose betwenn different spinner sizes and versions
for Light Theme and Dark Theme.


| Type                      | Example                            | Recommendation                                                          |
|---------------------------|------------------------------------|-------------------------------------------------------------------------|
| Spinner X-Small           | ❌ @DEV: BITTE SPINNER EINFÜGEN    | Only for in-component loaders, such as in buttons or input fields.      |
| Spinner Small - Large     | ❌ @DEV: BITTE 3 SPINNER EINFÜGEN  | For module or page loading, optionally accompanied by a text label.     |

### Additional text label
It can be helpful to include text to improve clarity. Keep it simple by only explaining
**why** the user is waiting. Never use texts such as "Don't click again", for example to prevent
the user from clicking twice on a shopping button in order not to create an extra order.
A loading animation should always be a user-friendly helper, not a threat.

* For X-Small size, you should use copytext.
* For larger spinner sizes, you can use any additional size, depending on your needs and the available space.
* Text must always be placed beneath or on the right side of the loader, keeping a minimum spacing of 16 px between spinner and text.

❌ BEISPIELABBILDUNGEN


---

## Layout
Whenever used as an independent item within a page or module, the spinner should always
be placed vertically and horizontally centered within the referring area.
Within a dedicated component, the placement of the spinner is determined by the
respective element it replaces or accompanies.

❌ BEISPIELE

---

## Interaction

A spinner itself is never clickable, but it is the spinner that determines
the clickability of the surrounding elements.

### Component blocking
If a spinner is triggered by an interaction with a component, it is recommended to disable
the component while the spinner is visible.

❌ EXAMPLE: LOADING BUTTON

### Screen blocking
Using a loading spinner for parts of a screen or within dedicated components usually means
that the user is able to cancel the operation, for example by clicking somewhere else.
If the user is not supposed to start another activity, you should block the screen.
This can be done by using a full size block overlay for the whole screen and placing
the loader on top:

* Light Theme: Blocking layer in Porsche Light, 90% opacity
* Dark Theme: Blocking layer in Porsche Dark, 90% opacity


❌ EXAMPLES BLOCKING LAYER

---

## Recommendations

### Bridging delays of more than 10 seconds
A spinner offers feedback that the system is working, but not on how long it will take.
Fostering the user to stare at a spinning wheel for more than 10 seconds will most likely
make the users get impatient, wandering around on your website, abandon their current task,
or, worst case, close your application. So, if the result takes more than 10 seconds to
appear, you should better provide a progress bar, showing the estimated waiting time.

### Avoid spinner overload
Using too much spinners at a time or within a page or application in general
can also create user frustration. This should be avoided by carefully considering
where a loader makes sense and which loader type is best suited.


---

## Related components
* [Button Regular](#/components/action/button-regular)
* [Button Icon](#/components/actions/button-icon)

---

## Accessibility

* The aria-label "loading" should be used to indicate the loading state.
* Tabindex should be used to ensure that the loading spinner is found with the keyboard.
