# Style Guide Porsche Finder

## Golden rule

Follow always these rules and correct them if necessary. Just KISS 😘 and DRY!

> Every line of code should appear to be written by a single person, no matter the number of contributors.


## Component Structure

We use an approach similar to [PatternLab](http://patternlab.io/) to structure our components. This means we develop Atoms, Molecules, Organisms and Screens independently from Redux / API calls / etc. in a component catalog.

### Atoms

### Molecules

### Organisms

### Screens

## Naming

- **Filename:** Use PascalCase for filenames, e.g. `Grid.tsx`
- **Suffixes:** Don't include any sort of filename suffixes for components in the ui-kit.

```
// good

Grid.tsx
Header.tsx

// bad
Grid.component.tsx
Header.organism.tsx
```


## HTML


### Syntax

*   Use soft tabs with **4 spaces** — they're the only way to prevent excessive nesting while keeping up readability.
*   Nested elements should be indented once (4 spaces).
*   Always use double quotes, never single quotes, on attributes.
*   Don't include a trailing slash in self-closing elements—the [HTML5 spec](http://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag) says they're optional.
*   Don’t omit optional closing tags (e.g. `</li>` or `</body>`).

```
  <!DOCTYPE html>
  <html>
      <head>
          <title>Page title</title>
      </head>
      <body>
          <img src="logo.png" alt="Company">
          <h1 class="hello-world">Hello, world!</h1>
      </body>
  </html>
```


### HTML5 doctype

Enforce standards mode and more consistent rendering in every browser possible with this simple doctype at the beginning of every HTML page.

```
  <!DOCTYPE html>
  <html>
    <head>
    </head>
  </html>

```

### Language attribute

From the HTML5 spec:

> Authors are encouraged to specify a lang attribute on the root html element, giving the document's language. This aids speech synthesis tools to determine what pronunciations to use, translation tools to determine what rules to use, and so forth.

Read more about the `lang` attribute [in the spec](http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element).

Head to Sitepoint for a [list of language codes](http://reference.sitepoint.com/html/lang-codes).


```
  <html lang="de">
    <!-- ... -->
  </html>
```


### IE compatibility mode

Internet Explorer supports the use of a document compatibility `<meta>` tag to specify what version of IE the page should be rendered as. Unless circumstances require otherwise, it's most useful to instruct IE to use the latest supported mode with **edge mode**.

For more information, [read this awesome Stack Overflow article](http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e).


```
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
```


### Character encoding

Quickly and easily ensure proper rendering of your content by declaring an explicit character encoding. When doing so, you may avoid using character entities in your HTML, provided their encoding matches that of the document (generally UTF-8).


```
    <head>
        <meta charset="UTF-8">
    </head>
```

### Practicality over purity

Strive to maintain HTML standards and semantics, but not at the expense of practicality. Use the least amount of markup with the fewest intricacies whenever possible.


### Attribute order

HTML attributes should come in this particular order for easier reading of code.

*   `class`
*   `id`, `name`
*   `src`, `for`, `type`, `href`, `value`
*   `title`, `alt`
*   `role`, `aria-*`
*   `data-*`

Classes make for great reusable components, so they come first. Ids are more specific and shouldn't be used for styling but for reference, e.g. for in-page bookmarks, so they come second.


```
    <a class="..." id="..." href="..." data-toggle="...">
        Example link
    </a>

    <input class="..." type="...">

    <img src="..." alt="...">
```


### Boolean attributes

A boolean attribute is one that needs no declared value.

For further reading, consult the [WhatWG section on boolean attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes):

> The presence of a boolean attribute on an element represents the true value, and the absence of the attribute represents the false value.

If you _must_ include the attribute's value, and **you don't need to**, follow this WhatWG guideline:

> If the attribute is present, its value must either be the empty string or [...] the attribute's canonical name, with no leading or trailing whitespace.

**In short, don't add a value.**


```
    <input type="text" disabled>

    <input type="checkbox" value="1" checked>

    <select>
        <option value="1" selected>1</option>
    </select>
```




## CSS


### Syntax

*   Use soft tabs with **4 spaces** — they're the only way to prevent excessive nesting while keeping up readability.
*   When grouping selectors, keep individual selectors to a single line.
*   Include one space before the opening brace of declaration blocks for legibility.
*   Place closing braces of declaration blocks on a new line.
*   Include one space after `:` for each declaration.
*   Each declaration should appear on its own line for more accurate error reporting.
*   End all declarations with a semi-colon. The last declaration's is optional, but your code is more error prone without it.
*   Comma-separated property values should include a space after each comma (e.g., `box-shadow`).
*   Lowercase all hex values, e.g., `#fff`. Lowercase letters are much easier to discern when scanning a document as they tend to have more unique shapes.
*   Use shorthand hex values where available, e.g., `#fff` instead of `#ffffff`.
*   Quote attribute values in selectors, e.g., `input[type="text"]`. [They’re only optional in some cases](http://mathiasbynens.be/notes/unquoted-attribute-values#css), and it’s a good practice for consistency.
*   Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`.

Questions on the terms used here? See the [syntax section of the Cascading Style Sheets article](http://en.wikipedia.org/wiki/Cascading_Style_Sheets#Syntax) on Wikipedia.



```
    /* Bad CSS */
    .selector, .secondary, .selector[type=text] {
    padding:15px;
    margin:0px 0px 15px;
    background-color:rgba(0, 0, 0, 0.5);
    box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
    }

    /* Good CSS */
    .selector,
    .secondary,
    .selector[type="text"] {
        padding: 15px;
        margin-bottom: 15px;
        background-color: rgba(0 ,0 ,0 , 0.5);
        box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
    }
```

### Declaration order

Related property declarations should be grouped together following the order:

1.  Positioning
2.  Box model
3.  Typographic
4.  Visual

Positioning comes first because it can remove an element from the normal flow of the document and override box model related styles. The box model comes next as it dictates a component's dimensions and placement.

Everything else takes place _inside_ the component or without impacting the previous two sections, and thus they come last.

For a complete list of properties and their order, please see [Recess](http://twitter.github.com/recess).



```
    .declaration-order {
        /* Positioning */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;

        /* Box-model */
        display: block;
        float: right;
        width: 100px;
        height: 100px;

        /* Typography */
        font: normal 13px "Helvetica Neue", sans-serif;
        line-height: 1.5;
        color: #333;
        text-align: center;

        /* Visual */
        background-color: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 3px;

        /* Misc */
        opacity: 1;
    }
```


### Prefixed properties

You don't need vendor prefixes, because the system has PostCSS Autoprefixer included :-)


### Shorthand notation

Strive to limit use of shorthand declarations to instances where you must explicitly set all the available values. Common overused shorthand properties include:

*   `padding`
*   `margin`
*   `font`
*   `background`
*   `border`
*   `border-radius`

Often times we don't need to set all the values a shorthand property represents. For example, HTML headings only set top and bottom margin, so when necessary, only override those two values. Excessive use of shorthand properties often leads to sloppier code with unnecessary overrides and unintended side effects.

The Mozilla Developer Network has a great article on [shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) for those unfamiliar with notation and behavior.



```
    /* Bad example */
    .element {
      margin: 0 0 10px;
      background: red;
      background: url("image.jpg");
      border-radius: 3px 3px 0 0;
    }

    /* Good example */
    .element {
      margin-bottom: 10px;
      background-color: red;
      background-image: url("image.jpg");
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
```

### Nesting in Sass

Avoid unnecessary nesting. Just because you can nest, doesn't mean you always should. Consider nesting only if you must scope styles to a parent and if there are multiple elements to be nested. If you are in a REACT/ANGULAR environment, you probably can prevent nesting at all because of js scoping.

Additional reading:

*   [Nesting in Sass and Less](http://markdotto.com/2015/07/20/css-nesting/)

```
    // Excessive nesting
    .element {
      margin-top: 5px;
      .child-element {
        .another-child {
          > .headline {
            padding-top: 0;
          }
        }
      }
    }

    // Without nesting
    .element {
      margin-top: 5px;
    }
    .headline {
      padding-top: 0;
    }
```


### Operators in Sass

For improved readability, wrap all math operations in parentheses with a single space between values, variables, and operators.

```
    // Bad example
    .element {
      margin: 10px 0 $variable*2 10px;
    }

    // Good example
    .element {
      margin: 10px 0 ($variable * 2) 10px;
    }
```


### Comments

Code is written and maintained by people. Ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.


```
    /* Bad example */
    /* Modal header */
    .modal-header {
      ...
    }

    /* Good example */
    /* Wrapping element for .title and .close */
    .modal-header {
      ...
    }
```


### Class names
*   For global styles follow [BEM](http://getbem.com/introduction/) styling rules.
*   Keep scoped classes lowercase and use dashes (not underscores or camelCase). Dashes serve as natural breaks in related class (e.g., `.btn` and `.btn-danger`).
*   Avoid excessive and arbitrary shorthand notation. `.btn` is useful for _button_, but `.s` doesn't mean anything.
*   Keep classes as short and succinct as possible.
*   Use meaningful names; use structural or purposeful names over presentational.

It's also useful to apply many of these same rules when creating Sass variable names.


### Selectors

*   Use classes over generic element tag for optimum rendering performance.
*   Avoid using several attribute selectors (e.g., `[class^="..."]`) on commonly occuring components. Browser performance is known to be impacted by these.
*   Keep selectors short and strive to limit the number of elements in each selector to three.

Additional reading:

*   [Scope CSS classes with prefixes](http://markdotto.com/2012/02/16/scope-css-classes-with-prefixes/)
*   [Stop the cascade](http://markdotto.com/2012/03/02/stop-the-cascade/)


### Editor preferences

Set your editor to the following settings to avoid common code inconsistencies and dirty diffs:

*   Use soft-tabs set to 4 spaces.
*   Trim trailing white space on save.
*   Set encoding to UTF-8.
*   Add new line at end of files.

Consider documenting and applying these preferences to your project's `.editorconfig` file. For an example, see [the one in Bootstrap](https://github.com/twbs/bootstrap/blob/master/.editorconfig). Learn more [about EditorConfig](http://editorconfig.org).


## Notes
Heavily inspired by [Code Guide by @mdo](http://codeguide.co/).
