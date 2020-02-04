# Slotted Content

Some of our components use slots to provide textual content with our styling (e.g. `p-text` or `p-link-pure`). 
We basically do support slotted content which is even wrapped inside HTML and/or contains HTML:

```html
<p-text>
  The quick brown fox <a href="#">jumps over</a> the lazy dog
</p-text>
```  

## Problem
In some circumstances it is common to provide such content with the help of innerHTML (which will eventually break!):

### Angular
```angularjs
<p-text [innerHTML]="theHTMLString"></p-text>
```  

### React
```javascript
<p-text dangerouslySetInnerHTML={theHTMLString()}></p-text>
```  

The above examples break in case that the component is rendered in polyfill mode without a shadow dom (e.g. in IE11).
That's because the inner HTML will strip out all the contents of the component.


## Solution
As a workaround, you have to provide the contents like this:

### Angular
```angularjs
<p-text>
  <span [innerHTML]="theHTMLString"></span>
</p-text>
``` 
### React
```javascript
<p-text>
  <span dangerouslySetInnerHTML={theHTMLString()}></span>
</p-text>
``` 