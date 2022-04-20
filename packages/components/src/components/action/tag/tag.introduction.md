# Tags

<TableOfContents></TableOfContents>

## When to use

• Indicate or highlight a certain attribute of an item.  
• Show that content is mapped to one or multiple categories.  
• Indicate that a certain filter is active.  

### Naming

Use short naming for easy scanning. Use two words only if necessary to describe the status and differentiate it from other tags. 

### Scalable

Technically a UI could have as many tags as needed, there are different options when a set of tags cannot fit on screen:  
• A group of dismissable tags becomes horizontal scrollable, swipeable, or navigable with arrows.  
• Tags are set in a predefined space and move to the next line once they meet the boundary.  

---

## Types

### Tag  

| Type | Usage |
|----|----|
| Tag | To indicate that an item has a certain attribute or is mapped to a category. |

| Variants | |
|----|----|
| Colors | Color themes such as success, neutral, warrning and error can be selected for better visual perception. |
| Icon | Include icons to improve faster perception. |
| Link or button | To show additional information. |

### Link or button

A link within a tag allows adding certain information such as:   
• Further explanation about the tag for better understandability.  
• Additional information that is not necessary for the task completion.  
  
Suitable methods to show additional information could be the [Modal](components/modal) component.  
A button or link within a tag is not allowed to be used for navigation.  

---

### Dismissable Tag

| Type | Usage |
|----|----|
| Dismissable Tag | To show that a certain filter is active. The selection can be deactivated by dismissing the tag. |

| Variants | |
|----|----|
| Default | To give better orientation to which category an attribute/filter refers. Labels are only available for dismissable tags. |
| Label | To give better orientation to which category an attribute/filter refers. Labels are only available for dismissable tags. |

### Dismiss

The entire component can be click or tap for the purpose of deactivating a certain filter and hidding the component. No other interaction with this component is allowed.

### Scalable

In case of long label or value dismissable tags can handle multiline text. This is not recommended and should be avoided.

### Icon

The x-icon can not be changed or hidden nor other icons can be added to the label or value.

---


## Related Components

- [Modal](components/modal)