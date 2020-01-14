# Functions

## px to rem converter
Converts a pixel value into a root em (rem) value. The base font size for rem calculation is
set to 16 px by default.

#### Example
```
div {
  width: p-rem(123px);
}
```

#### Result
```
div {
  width: 7.6875rem;
}
```