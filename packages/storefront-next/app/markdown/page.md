## Typography

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Horizontal Rules

---

---

---

## Emphasis

**This is bold text**

**This is bold text**

_This is italic text_

_This is italic text_

~~Strikethrough~~

## Blockquote

> Blockquote can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

## Lists

Unordered

- Create a **list** by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
1. Integer molestie lorem at massa

Start numbering with offset:

57. foo
1. bar

## Heading (H3 - H6) with List

### Heading H3

- Unordered List

#### Heading H4

- Unordered List

##### Heading H5

- Unordered List

###### Heading H6

- Unordered List

### Heading H3

1. Ordered List

#### Heading H4

1. Ordered List

##### Heading H5

1. Ordered List

###### Heading H6

1. Ordered List

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Diff

```diff
- <p-banner></p-banner>
+ <p-banner open="true"></p-banner>
```

Syntax highlighting

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description                                                                        |
| ------ | ---------------------------------------------------------------------------------- |
| data   | Lorem ipsum dolor sit amet.                                                        |
| engine | Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. |
| ext    | At vero eos et accusam et justo duo dolores et ea rebum.                           |

Right aligned columns

| Option |                                                                        Description |
| -----: | ---------------------------------------------------------------------------------: |
|   data |                                                        Lorem ipsum dolor sit amet. |
| engine | Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. |
|    ext |                           At vero eos et accusam et justo duo dolores et ea rebum. |

## Links

[link text](https://designsystem.porsche.com/)

[link with title](https://designsystem.porsche.com/ 'Porsche Design System')

Autoconverted link https://designsystem.porsche.com/

## Images

![Porsche 992 Carrera S](../assets/porsche-992-carrera-s.jpg)

![Porsche 718 GTS](../assets/porsche-718-gts.jpg 'The Porsche 718 GTS')

Like links, Images also have a footnote style syntax with a reference later in the document defining the URL location.

![Alt text][id]

[id]: ../assets/porsche-911-gt2-rs.jpg '911 GT2 RS'
