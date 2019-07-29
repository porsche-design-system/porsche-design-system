# Text list

## Introduction
Text lists are used to display listed data in form of an unordered or ordered list. A list depends on 2 parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists.

## Lists

### Unordered list

<Playground>
  <p-text-list>
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    <p-text-list-item>
      Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
      <p-text-list>
        <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
        <p-text-list-item>Lorem ipsum</p-text-list-item>
      </p-text-list>
    </p-text-list-item>
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
  </p-text-list>
</Playground>

### Ordered list 

<Playground>
  <p-text-list list-type="ordered">
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    <p-text-list-item>
      Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
      <p-text-list list-type="ordered">
        <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
        <p-text-list-item>Lorem ipsum</p-text-list-item>
      </p-text-list>
    </p-text-list-item>
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
  </p-text-list>
</Playground>

---

### List with different colors

<Playground>
  <p-text-list color="porsche-light" style="background: black;">
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    <p-text-list-item>
      Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
      <p-text-list>
        <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
        <p-text-list-item>Lorem ipsum</p-text-list-item>
      </p-text-list>
    </p-text-list-item>
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
  </p-text-list>
  <p-text-list color="inherit" style="color: deeppink;">
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    <p-text-list-item>
      Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
      <p-text-list>
        <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
        <p-text-list-item>Lorem ipsum</p-text-list-item>
      </p-text-list>
    </p-text-list-item>
    <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
  </p-text-list>
</Playground>
