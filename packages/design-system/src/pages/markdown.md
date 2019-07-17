## Typography

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquote

> Blockquote can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a **list** by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


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

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | Lorem ipsum dolor sit amet. |
| engine | Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. |
| ext    | At vero eos et accusam et justo duo dolores et ea rebum. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | Lorem ipsum dolor sit amet. |
| engine | Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. |
| ext    | At vero eos et accusam et justo duo dolores et ea rebum. |


## Links

[link text](https://ui.porsche.com/)

[link with title](https://ui.porsche.com/ "Porsche UI")

Autoconverted link https://ui.porsche.com/


## Images

![Porsche 992 Carrera S](../assets/porsche-992-carrera-s.jpg)

![Porsche 718 GTS](../assets/porsche-718-gts.jpg "The Porsche 718 GTS")

Like links, Images also have a footnote style syntax with a reference later in the document defining the URL location.

![Alt text][id]

[id]: ../assets/porsche-911-gt2-rs.jpg "911 GT2 RS"
