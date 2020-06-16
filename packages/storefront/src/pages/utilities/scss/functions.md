# Scss

## p-rem($px)
Converts px to rem unit. The base for rem calculation is defined with 16px by default.  
`$px` only accepts value in px unit, e.g. 12px.

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

---

## p-px($rem)
Converts rem to px unit. The base for rem calculation is defined with 16px by default.  
`$rem` only accepts value in rem unit, e.g. 1.5rem.

#### Example
```
div {
  width: p-px(1rem);
}
```

#### Result
```
div {
  width: 16px;
}
```