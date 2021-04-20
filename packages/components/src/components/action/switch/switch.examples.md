# Switch

The `p-switch` component is a control that is used to quickly switch between two possible states. 
A switch is only used for these binary actions that occur immediately after the user “flips the switch”. 
Commonly it is used for “on/off” switches.

## Basic example

<Playground :markup="basic" :config="config"></Playground>

---

## Bind events to the Button
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Switch from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground :markup="taborder" :config="config"></Playground>