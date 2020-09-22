# Tabs

Tabs are an intuitive way to organize content and allow navigation between groups of content that are related and at the same level of hierarchy.

---

## Types

### 1. Small

<p-tabs size="small">
    <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
    <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
    <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
</p-tabs>


### 2. Medium

<p-tabs size="medium">
    <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
    <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
    <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
</p-tabs>


---

## Variants

### Default

<p-tabs>
    <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
    <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
    <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
</p-tabs>


### Scrollable

<p-tabs>
    <p-tabs-item label="Item One">Tab Content One</p-tabs-item>
    <p-tabs-item label="Item Two">Tab Content Two</p-tabs-item>
    <p-tabs-item label="Item Three">Tab Content Three</p-tabs-item>
    <p-tabs-item label="Item Four">Tab Content Four</p-tabs-item>
    <p-tabs-item label="Item Five">Tab Content Five</p-tabs-item>
    <p-tabs-item label="Long Label Six">Tab Content Long Label Six</p-tabs-item>
    <p-tabs-item label="Item Seven">Tab Content Seven</p-tabs-item>
    <p-tabs-item label="Item Eight">Tab Content Eight</p-tabs-item>
    <p-tabs-item label="Item Nine">Tab Content Nine</p-tabs-item>
</p-tabs>


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

Each tabs item (arrows and text) spans over a clickable area of 40 x 40 px to guarantee a proper click- and touch-ability (on mobile devices).

### Skipping pages

The arrows allow to skip to the previous or next tab and therefore interactive by default. 

### Current tab

The current tab position is always marked by a red underline. By default, the current page item is not clickable.

---

## Usage

### Overflow

When a set of tabs cannot fit on screen the tab bar becomes horizontal swibeable and navigable with arrows.

- Scrolling horizontally
- Use the arrows to navigate back and forth
- Click on the Tab Item witch then will center the clicked element
- You can jump through tabs via the Tab key

![Possible overflow](./assets/tab-overflow.png)

### Scalable

As tabs can horizontally scroll, technically a UI could have as many tabs as needed.

### Informative

Tabs organize content into categories to help users easily find different types of information.

### Content

Tab labels provide clear and concise explanations of the content within. Each tab's content is independently categorized and mutually exclusive of the content of other tabs.

### Navigation

Not be used for primary navigation.