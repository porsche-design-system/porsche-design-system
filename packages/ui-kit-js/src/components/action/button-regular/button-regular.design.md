
# Button Regular

## Recommendation of use
A Button Regular enables the user to execute an action, change the state of an application or jump to another page with a single tap. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of buttons (basic, highlight, sales) can be used.

## Styling
* The Button Regular is available for light (standard) and dark (inverted) background.
* It always contains an icon (default: arrow right) and a text label in copytext size. The content is always positioned top left aligned within the button.
* Button dimensions:
    * __Width:__ By default, the button width is determined by the specific content length.
    * __Height:__ Standard size 50 px (padding left/right 18 px), small size 30 px (padding left/right 12 px). If it gets multilined, the Button Regular grows to the bottom, keeping its initial padding.
* The Button Regular comes in 2 different sizes. The small size is only to be used in dedicated cases, when a standard size is not appropriate (usually for lack of space).
* Different types of buttons are available to be used for specific contexts:
    * __Basic:__ Default button in grey (standard) or white (inverted).
    * __Highlight:__ Button Regular in red. To be used only for next best actions to give the user the best guidance possible. Allowed max. 2 times per screen.
    * __Sales:__ Button Regular in blue, only to be used for sales-relevant interactions or promotional functions.
* Filled & Ghost: Both Basic and Sales Button are available in filled and ghost (outline only) view. The ghost view is always subordinate to the filled view, thus it is often used in combination (e.g. Submit = filled / Cancel = ghost) or stand-alone, when there are other buttons on a page with higher priority.
* Button Positioning: By default, the Button Regular is to be positioned left-aligned within a module or a screen. Depending on the content and the user guidance, the position can be changed individually, e.g. it can also be placed right-aligned (e.g. in forms) or also at the end of a text (e.g. error notifications).

## Interaction
* The whole button area is clickable. The clickability is indicated by a specific hover state (slightly changing color).

## Usability
* __Button width:__ Even if there is no technical limit to the button width, you should always make sure that the button remains legible, even more so in multiline state. For copytext size, it is recommended to use max. 100 characters per line (equals approx. 700 px button width).
* __Disabled state:__ All types of Button Regular are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002).

## Usage in Sketch
* Drag the Button Regular from DSM on your artboard. Use the override panel to change both icon and button label, if needed. When overriding the button label, make sure to manually resize the button width and maintaining a padding-right of 18 px (small size: 12 px).
* If you insert multiline text (you can force a break in the override panel via alt + Enter), please make sure to resize the button manually both horizontally and vertically. For the correct height, the following formula will do the trick: line height * number of lines + 26 = final button height.
