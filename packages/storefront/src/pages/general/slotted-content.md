# Slotted Content

Some of our components use slots to provide text/html content with predefined styling (e.g. `p-text` or `p-link-pure`).

```html
<p-text>
  The quick brown fox <a href="#">jumps over</a> the lazy dog
</p-text>
```  

## Problem
In some circumstances it is common to provide such content with the help of innerHTML or innerText (which breaks in browser not supporting Shadow DOM):

### Angular
```angular
<p-text [innerHTML]="theHTMLString"></p-text>
```  

### React
```react
<PText dangerouslySetInnerHTML={theHTMLString()}></PText>
```  

The above examples break in the case that the component is rendered in polyfill mode without a Shadow DOM (e.g. in IE11).
That's because the innerHTML will strip out all the contents of the component.


## Solution
As a workaround, you have to provide the contents like this:

### Angular
```angular
<p-text>
  <span [innerHTML]="theHTMLString"></span>
</p-text>
``` 
### React
```react
<PText>
  <span dangerouslySetInnerHTML={theHTMLString()}></span>
</PText>
``` 