# Js

## typeScale(fontSize)

Calculates font-size and line-height to fit into Porsche Vertical Grid System. 
The `fonzSize` parameter only accepts value in rem or px, e.g. 12px or 1.5rem.

#### Example

```
import { typeScale } from '@porsche-design-system/utilities';

const StyledP = styled.p`
  typeScale('32px');
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

## getColorHexCode(pdsColor, specification?, theme?)

If you need a dynamic calculation of our color hexcodes in relation of light and dark theme, the function `getColorHexCode()` can be used.
There are three parameter `pdsColor`, `specification`, `theme`, where only the first parameter is mandatory.
Due to the nesting of the `color` object, the second parameter is dynamic and allows a deeper level to be reached. The `theme` parameter lets you choose between `dark` and `light` and defaults to `light`.
 
#### Example 

```
import { getColorHexCode } from '@porsche-design-system/utilities';

const hexCodeBrand = getColorHexCode('brand');
``` 

#### Result

The result is the equivalent to `color.brand`

```
hexCodeBrand = '#d5001c';
```

#### Example 

Use the `specification` parameter to reach one object level deeper.

```
import { getColorHexCode } from '@porsche-design-system/utilities';

const hexCodeFacebook = getColorHexCode('external', 'facebook');
``` 

#### Result

The result is the equivalent to `color.external.facebook`

```
hexCodeFacebook = '#1877f2';
```

#### Example 

Use the `specification` parameter to reach one object level deeper and the `dark` theme.

```
import { getColorHexCode } from '@porsche-design-system/utilities';

const hexCodeNeutralContrastHigh = getColorHexCode('neutralContrast', 'high', 'dark');
``` 

#### Result

The result is the equivalent to `color.darkTheme.neutralContrast.high`

```
hexCodeNeutralContrastHigh = '#e3e4e5';
```