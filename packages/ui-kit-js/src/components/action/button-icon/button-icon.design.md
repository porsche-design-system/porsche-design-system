# Button Icon

# General information

A Button Icon is an icon-only squared button that enables the user to execute an action or to jump to another page with a single tap. As it only contains an icon and no further text information, it is highly recommended to only use it in cases where the user is fully aware of the button function (this can be ensured e.g. by using an expressive icon or by logical composition with other components - just think of a form field followed by a Button Icon with submit function).

---

# Button types

In order to provide an optimal user guidance within a page, different hierarchy types of the Button Icon are available:

## 1. Basic

❌  @DEV: Bitte beispielhaft Button icon basic (Light Theme) einfügen.

Default Button Icon with monochrome color fill.

## 2. Ghost

❌  @DEV: Bitte beispielhaft Button icon ghost (Light Theme) einfügen.

An "outline only" Button Icon version. It is always to be used stand-alone and never in combination with a filled Button Icon or other button types. In hierarchy the ghost button is always subordinated to color filled button actions within the same page.

---

# Button states

All button types are available in the following states:

| STATE | DESCRIPTION | EXAMPLE |
|----|----|----|
| default | Default button state. | [example] |
| active / hover | In active or hover state, the background color changes slightly and gets either a bit lighter or darker. | [example] |
| disabled | Whenever the button function is not available, it is indicated by a greyed-out button color. | [example] |
| loading | To indicate the loading process when clicking on the text link, the icon is replaced by a small loading spinner. | [example] |
| focus | In focus state, the button is bordered by a 2 px line in focus color. | [example] |

---

# Content

The Button Icon is available for both Porsche Light and Dark Theme. It only contains an **icon** that can be replaced by any icon available in the Porsche web icon set. Per default, an arrow right is set that should serve in most of all cases. It should only be changed if it is ensured that another symbol is more appropriate to support the text content, making it easier for the user to understand the function quickly. A good example might be to use a shopping icon or a plus icon for a Button "Add to cart". 

---

# Usability & interaction

## Clickability

The whole button area is clickable. The clickability is indicated by a specific hover state (slightly changing color).

## Disabled state

All types of Button Icon are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002).