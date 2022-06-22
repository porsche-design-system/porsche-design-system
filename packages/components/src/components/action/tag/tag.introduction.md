# Tags

<TableOfContents></TableOfContents>

## When to use

- Indicate or highlight a certain attribute of an item.  
- Show that content is mapped to one or multiple categories.  
- Indicate that a certain filter is active.  

### Content

Use short text content for easy scanning. Use two words only if necessary to describe the status and differentiate it from other tags. 

### Scalable

Technically a UI could have as many tags as needed, there are different options when a set of tags cannot fit on screen:  
- A group of tags becomes horizontal scrollable, swipeable, or navigable with arrows.  
- Tags are set in a predefined space and move to the next line once they meet the boundary.  

---

## Types

### Tag  

| Name | Usage |
|----|----|
| `p-tag` | To indicate that an item has a certain attribute or is mapped to a category. |

| Variants | |
|----|----|
| Color | Color themes such as success, neutral, warrning and error can be selected for better visual perception. |
| Icon | Include icons to improve faster perception. |
| With link or button | To show additional information a link or button can be passed into the tag. By doing this, the entire component becomes clickable and no other content than the button or link is allowed. |

#### With link or button

A link within a tag allows adding certain information such as:   
- Further explanation about the tag for better understandability.  
- Additional information that is not necessary for the task completion.  
  
Suitable methods to show additional information could be the [Modal](components/modal) component.  
A button or link within a tag is not allowed to be used for navigation.  

---

### Tag Dismissible

| Name | Usage |
|----|----|
| `p-tag-dismissible` | To show that a certain filter is active. By clicking the tag it is dismissed and the selection is deactivated. |

| Variants | |
|----|----|
| Label | If additional information for better orientation is needed. E.G. to which category an attribute/filter refers. |

#### Interaction

On click or tap the entire component should be dismissed for the purpose of deactivating a certain filter. No other interaction with this component is allowed.

#### Scalable

In case of long label or value dismissible tags can handle multiline text. This is not recommended and should be avoided.

---


## Related Components

- [Modal](components/modal)