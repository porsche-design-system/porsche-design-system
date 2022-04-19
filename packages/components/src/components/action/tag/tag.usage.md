# Tags

<TableOfContents></TableOfContents>

## When to use

• Indicate or highlight a certain attribute of an item.  
• Show that content is mapped to one or multiple categories.  
• Indicate that a certain filter is active.

---

## Types

To ensure a seamless UX in all Porsche web applications it is recommended to use Tags as followed:

| Type | Usage |
|----|----|
| Tag | To highlight a certain attribute of an item in the content. |
| Dismissable Tag | To give a visual indication that a certain filter is set. The selection can be deactivated by dismissing the tag. |

| Variants | |
|----|----|
| Icon | Include icons to improve visual perception. |
| Link | Involve links to show (Modal or Pop Over) or link to additional information. |
| Label | To give better orientation to which category an attribute/filter refers. |



## Behavior

### Naming

Use short naming for easy scanning. Use two words only if necessary to describe the status and differentiate it from other tags.


### Links (Additional Information)

A link within a tag allows adding certain information such as:  
• To give further explanation about the tag for better understandability.  
• Additional information that is not necessary for the task completion (User Flow).

Suitable methods to show information could be the [Popover](components/popover) or the [Modal](components/modal) component.
A Link within a tag is not recommended to be used as navigation.


### Scalable

Technically a UI could have as many tags as needed, there are two options when a set of tags cannot fit on screen:  
• The group becomes horizontal scrollable, swipeable, or navigable with arrows.  
• Tags are set in a predefined space and move to the next line once they meet the boundary.

---


## Related Components

- [Popover](components/popover)
- [Modal](components/modal)