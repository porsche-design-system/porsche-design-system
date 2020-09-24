# Tabs

The Porsche Design System Tabs enables the user to **to execute an action or changes the content**. 
In case you want the user to navigate to another page, you should select the [Tabs Nav](#/components/tabs-nav) component instead.

---

## Types

### 1. Small

!!! Code Beispiel !!!


### 2. Medium

!!! Code Beispiel !!!


---

## Variants

### Default

<p-tabs size="small">
  <p-tabs-item label="Item One" selected="">Tab Content One</p-tabs-item>
  <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
  <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
</p-tabs>


### Scrollable

If the amount of `p-tabs-item` exceed the viewport, the buttons become horizontal scrollable.

!!! Code Beispiel !!!




---

## States

The link covers the following states:

* Default
* Active
* Hover
* Focus

---

## Interaction

### Clickability

Each Tabs item (arrows and text) spans over a clickable area of 24 x 24 px to guarantee a proper click- and touch-ability.

### Skipping pages

The arrows allow to skip to the previous or next tab and therefore interactive by default. 

### Current tab

The current tab position is always marked by a red underline. By default, the current page item is not clickable.

---

## Usage

### Overflow

When a set of Tabs cannot fit on screen the tab bar becomes horizontal swibeable and navigable with arrows.

- Scrolling horizontally
- Use the arrows to navigate back and forth
- Click on the Tab Item witch then will center the clicked element

![Possible overflow](./assets/tab-overflow.png)

### Scalable

As Tabs can horizontally scroll, technically a UI could have as many tabs as needed.

### Weight

Standard

!!! Code Beispiel !!!

Highlight

!!! Code Beispiel !!!

The standard variant (regular) will be used on a monochrome background, whereas the highlight variant (semibold) should be 
used on a polychrome background (e.g. on images) for better comprehensibility and accessibility.

### Informative

Tabs organize content into categories to help users easily find different types of information.

### Content

Tab labels provide clear and concise explanations of the content within. Each tab's content is independently categorized and mutually exclusive of the content of other Tabs.

### Navigation

Not be used for primary navigation.


---

## Related Component
* [Tabs Nav](#/components/tabs-nav)
