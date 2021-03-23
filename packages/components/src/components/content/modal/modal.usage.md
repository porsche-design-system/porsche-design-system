# Modal

## When to use

  • Use a Modal when you want to show additional information to the user without losing context of the parent page.  
  • Use a Modal when there are steps the user needs to do before the task can be completed.  
  • Use a Modal where you need to ask for confirmation from the user before doing a lengthy or dangerous action.  

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use the Modal as follows

| Type | Usage |
|----|----|
| Default Modal | Use a default modal for content that doesn’t require a complex task. |
| Fullscreen | Fullscreen modals group a series of tasks. Because they take up the entire screen, fullscreen modals are the only modals over which other modals can appear.
Due to the size of fullscreen on desktop, it is easy to lose context for the consumer. Furthermore, you lose helpful functionality like backdrop click. This is why fullscreen modals are for mobile devices only.



| Variant | Usage |
|----|----|
| Basic | By default, Modals have a title and can be closed by clicking on the “x” in the upper right hand corner of the container. |
| Without close icon | The Modal without close “x” will dont close the modal without any interaction. |
| Without title | If the context is short and clear, the title can be skipped to avoid duplication. |
| Without title and close icon | For descriptive content and the need to close the Modal with a interaction. |


## Behavior

### Overlay
We use a shaded background overlay to provide to provide the feeling of a third dimensional layer. 
This also eliminates distraction and helps the user focus on the Modal content.

### Animation
The background overlay animates once a Modal is launched to grab a user’s attention and retain their focus.

### Close
Within a Model are multiple ways to dismiss a Modal but a user needs to intentionally make that choice.

## Usage

### Attention
Modals are disruptive. Only use Modals when you need the user’s full attention for the period of time the Modal is displayed.

### Scrolling
Scrolling is available but we recommend to put Modal content in a single view. If your Modal has a lot of detail or a 
long list of items, consider a different solution, such as a form or a table.

### Size
The modal can be adjusted in width and can be used depending on the requirements. It is important that the minimum and maximum sizes are observed. In addition, the modal should be aligned with the grid.

### Line length
We recommended to use no more than 80 characters or glyphs per line. This might differ a bit depending on the respective line height and viewport size and results in different pixel widths depending on the Porsche type class in use. Please find more information in the [Typography guideline](#/components/typography).

---

## Do’s & Don’ts

### Don't use more than two buttons
There should be no more than 3 actions. Actions should always be located within an action bar at the bottom of the Modal. 
Button order and positioning should follow our guidelines for [Buttons](#/patterns/buttons).

![Usage Buttons](./assets/modal-dialog-more-than-three-buttons.png)

### Stacking Modals
Modals shouldn’t launch other modals. Stacking Modals makes it hard to dismiss them and confuses the user on their levels of importance.

![Stacking modals](./assets/modal-stacking-modals.png)
