# Js

<TableOfContents></TableOfContents>

## generateFontDefinition(fontSize, fontWeight)

With the `generateFontDefinition()` function it is possible to get various kinds of font variants (size and weight) by passing two parameters as variables for `fontSize` and `fontWeight`.
The `fontSize` is freely selectable, for the `fontWeight` one of the predefined weight values must be chosen.

Predefined size values are:  
 `12 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72 | 84 | xSmall | small | medium | large | xLarge`  

Pre defined weight values are:  
 `thin | regular | semibold | bold`

#### Example usage

```
import { generateFontDefinition } from '@porsche-design-system/utilities';

const StyledText = styled.p`
  ${generateFontDefinition('large', 'thin')};
`
```

#### Result

```
p {
  font-family: "Porsche Next", "Arial Narrow", Arial, 'Heiti SC', SimHei, sans-serif;
  font-weight: 100;
  font-size: 2.25rem;
  line-height: 1.33333;
}
```

## generateTypeScale(fontSize)

Generates font-size and line-height styling definition to fit into Porsche Vertical Grid System.
The `fontSize` parameter only accepts value in rem or px, e.g. 12px or 1.5rem.

#### Example

```
import { generateTypeScale } from '@porsche-design-system/utilities';

const StyledP = styled.p`
  ${generateTypeScale('32px')}
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

## calculateLineHeight(fontSize)

Calculates line-height to fit into Porsche Vertical Grid System. 
The `fontSize` parameter only accepts value in rem or px, e.g. 12px or 1.5rem.

#### Example

```
import { calculateLineHeight } from '@porsche-design-system/utilities';

const StyledP = styled.p`
  lineHeight: ${calculateLineHeight('32px')}
`
```

#### Result

```
p {
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