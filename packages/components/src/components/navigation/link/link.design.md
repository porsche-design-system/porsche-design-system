# Link

The Porsche Design System Link enables the user to **navigate to another page**. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of links (primary, secondary, tertiary) can be used.
(In case you want the user to execute an action, you should select the [Button](components/button) component instead.)

<TableOfContents></TableOfContents>

## Types

### 1. Primary

<p-link variant="primary" href="https://www.porsche.com">Some label</p-link>

Link filled with the Porsche brand color. This type is only to be used for one or two high-priority actions within a page in order to give the user optimal guidance.

### 2. Secondary

<p-link href="https://www.porsche.com">Some label</p-link>

Default link with monochrome color fill. To be used for all other stand-alone Links that aren't high priority.

### 3. Tertiary

<p-link variant="tertiary" href="https://www.porsche.com">Some label</p-link>

An "outline only" link version. In hierarchy it is always subordinated to the filled view and can be used in two different cases:

- In combination with a filled link (primary or secondary), for example in popular pairings such as "submit" (primary or secondary) and "cancel" (tertiary).
- Stand-alone, when the priority of the action is lower compared to all other link actions within this page.


---

## Variants

### Icon and text

<p-link variant="primary" href="https://www.porsche.com">Some label</p-link> <p-link href="https://www.porsche.com" style="margin-left:16px;">Some label</p-link> <p-link variant="tertiary" href="https://www.porsche.com" style="margin-left:16px;">Some label</p-link>

This should be the option of your choice whenever possible, as icons should preferably always be paired with text for better comprehensibility and accessibility. The length of the link always adapts to the length of the text label.
The size of the icon container always equals the line height of the text it's combined with.

### Icon only

<p-link variant="primary" href="https://www.porsche.com" hide-label="true">Some label</p-link> <p-link href="https://www.porsche.com" hide-label="true" style="margin-left:16px;">Some label</p-link> <p-link variant="tertiary" href="https://www.porsche.com" hide-label="true" style="margin-left:16px;">Some label</p-link>

This variant contains an icon only with no further text information. It is highly recommended to use it only in cases where the user is fully aware of the link function. This can be ensured e.g. by using an expressive icon or by logical composition with other components.

---

## States

The link covers the following states:

* Default
* Hover
* Focus

---

## Styling

### Icon
The default icon is an arrow right that can be replaced by any icon available in the Porsche web icon set. It should be changed only if it is ensured that another symbol is more appropriate to support the text content, making it easier for the user to understand the function quickly.  

### External and internal links
For internal links the arrow should be sufficient in most cases. External links can be displayed with the following icon:

<p-link href="https://www.porsche.com" icon="link-extern" aria-label="Extern link">Some label</p-link>

### Text label
The text label within a link should always be short and descriptive.

---

## Usage

### Link position

By default the link is to be positioned left-aligned within a module or a screen. In special cases, where it serves a better user guidance, the position can be changed.

### Link width

Even if there is no technical limit to the link width, you should always make sure that the link remains legible, even more so in multiline state. It is recommended to use max. 100 characters per line (equals approx. 700px link width).

### Multiline links

Though it's technically possible to use multiline text in links, it's recommended to keep the text label short and, therefore, avoid multiline links.


<div style="background:#F2F2F2; width:100%; margin-top: 64px; padding-top: 32px; padding-left: 42px; padding-bottom: 42px;">
    <p-headline variant="headline-3" tag="h3" style="margin-bottom: 24px;">Examples</p-headline>
    <img src="./assets/link-examples.png" alt="" />
</div>
