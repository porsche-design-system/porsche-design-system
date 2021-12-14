# Popover

<TableOfContents></TableOfContents>

## When to use

* To display additional information that is not necessary for the task completion (User Flow).
* To give further explanation about workflow for better understandability.
* When it's not possible to show the content directly.

---

## Behavior 


### Open

The popover will be triggered via `click` on the info <p-icon name="information" aria="{ 'aria-label': 'Information icon' }"></p-icon>-button.

### Close 

Both the `esc` key and `click` outside the popover will close it.

### Direction
 
It's possible to define a preferred direction in which the popover should open (`top`, `right`, `bottom` , and `left`), 
given there is enough space in the viewport. Otherwise, it will be opened in the direction with the most available space automatically.


## Usage

### Placement

* Position popovers, so they don’t block related content.
* Use popovers consistently throughout your site.

## References

Nielsen Norman Group [Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/)

