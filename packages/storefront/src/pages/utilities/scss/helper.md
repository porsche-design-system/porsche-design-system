# Scss

<TableOfContents></TableOfContents>

## p-generate-font-definition($fontSize, $fontWeight)

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  <code>p-generate-font-definition()</code> mixin is <strong>deprecated</strong> and will be removed with next major release.<br>
  Please use the <code>$pds-font-family</code>, <code>$pds-font-weight-{regular|bold|semi-bold}</code>, <code>$pds-font-line-height</code> and one of the provided font sizes from <a href="styles/typography">typography</a>.
</p-inline-notification>

With this mixin, it's possible to get various kinds of text variants (size and weight) by passing two parameters as
variables for `size` and `weight`.

Pre defined **size** values are, `$p-font-size-{v};` where `v` is:  
`12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84 | x-small | small | medium | large | x-large`

Pre defined **weight** values are:  
`$p-font-weight-thin | $p-font-weight-regular | $p-font-weight-semibold | $p-font-weight-bold`

#### Example

```scss
p {
  @include p-generate-font-definition($p-font-size-large, $p-font-weight-thin);
}
```

#### Result

```css
p {
  font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
  font-weight: 100;
  font-size: 2.25rem;
  line-height: calc(6px + 2.125ex);
}
```

---

## p-generate-type-scale($size)

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  <code>p-generate-type-scale()</code> mixin is <strong>deprecated</strong> and will be removed with next major release.<br>
  Please use <code>$pds-font-line-height</code> and one of the provided font sizes from <a href="styles/typography">typography</a>.
</p-inline-notification>

Generates font-size and line-height styling definition to fit into Porsche Vertical Grid System. `$size` only accepts
value in rem or px, e.g. 12px or 1.5rem.

#### Example

```scss
p {
  @include p-generate-type-scale($p-font-size-32);
}
```

#### Result

```css
p {
  font-size: 2rem;
  line-height: calc(6px + 2.125ex);
}
```

---

## p-calculate-line-height($size)

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  <code>p-calculate-line-height()</code> mixin is <strong>deprecated</strong> and will be removed with next major release.<br>
  Please use the <code>$pds-font-line-height</code> variable provided at <a href="styles/typography">typography</a>.
</p-inline-notification>

Calculates line-height to fit into Porsche Vertical Grid System. The `$size` parameter only accepts value in rem or px,
e.g. 12px or 1.5rem.

#### Example

```scss
p {
  line-height: p-calculate-line-height($p-font-size-32);
}
```

#### Result

```css
p {
  line-height: calc(6px + 2.125ex);
}
```

---

## p-px-to-rem($px)

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  <code>p-px-to-rem()</code> mixin is <strong>deprecated</strong> without any replacement and will be removed with next major release.
</p-inline-notification>

Converts px to rem unit. The base for rem calculation is defined with 16px by default.  
`$px` only accepts value in px unit, e.g. 12px.

#### Example

```scss
div {
  width: p-px-to-rem(123px);
}
```

#### Result

```css
div {
  width: 7.6875rem;
}
```

---

## p-rem-to-px($rem)

<p-inline-notification heading="Important note" state="error" dismiss-button="false">
  <code>p-rem-to-px()</code> mixin is <strong>deprecated</strong> without any replacement and will be removed with next major release.
</p-inline-notification>

Converts rem to px unit. The base for rem calculation is defined with 16px by default.  
`$rem` only accepts value in rem unit, e.g. 1.5rem.

#### Example

```scss
div {
  width: p-rem-to-px(1rem);
}
```

#### Result

```css
div {
  width: 16px;
}
```
