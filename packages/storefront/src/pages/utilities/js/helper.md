# Js

## generateTypeScale(fontSize)

Calculates font-size and line-height to fit into Porsche Vertical Grid System. 
The `fontSize` parameter only accepts value in rem or px, e.g. 12px or 1.5rem.

#### Example

```
import { generateTypeScale } from '@porsche-design-system/utilities';

const StyledP = styled.p`
  generateTypeScale('32px');
`
```

#### Result

```
p {
  font-size: 2rem;
  line-height: 1.375;
}
```

---

## pxToRem(px)

Converts px to rem unit. The base for rem calculation is defined with 16px by default.  
Parameter `px` only accepts value in px unit, e.g. 12px.

#### Example

```
import { pxToRem } from '@porsche-design-system/utilities';

div {
  width: pxToRem('123px');
}
```

#### Result

```
div {
  width: 7.6875rem;
}
```

---

## remToPx(rem)

Converts rem to px unit. The base for rem calculation is defined with 16px by default.  
Parameter `rem` only accepts value in rem unit, e.g. 1.5rem.

#### Example

```
import { remToPx } from '@porsche-design-system/utilities';

div {
  width: remToPx('1rem');
}
```

#### Result

```
div {
  width: 16px;
}
```