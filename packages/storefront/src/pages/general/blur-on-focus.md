# Blur on Focus

We don't want the user to get distracted by the focus indication of elements if they click onto it but keep
the focus indication for keyboard navigation.

For this reason, we add by default a script that blurs focusable elements after a click. We keep the focus for
`input`, `select`, `textarea` that the user can still use form elements, after clicking into it.

If that default behaviour doesn't work for you, it's possible to opt-out with the `p-re-enable-focus-on-click`
class. You can set it to the focusable element itself or one of its parents to prevent our script to blur it.  
You can put the class to the `html` or `body` element to disable the behaviour completely and keep the native
focus behaviour of the browser.