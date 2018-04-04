# Definition of Done

## General
- are the variable names in the JSON file(s) like "${pattern-name}_${variableName}"
- are the variable names in the SCSS file(s) like "${pattern-name}${-element}?${-modifier}?${-property}${-state}?${breakpoint}?"
- is the pattern as small as possible?
- are all necessary files imported into the pattern scss
- are the following values exported as variables: colors, paddings, margins, width, height, font-size, left, right, top, bottom, opacity
- are the common mixins like _px-rem-convertor_, _spacing_, _flex_, _typo_, ... used in SCSS file(s)?
- Are all variables defined in the setup SCSS file(s) set to !default?
- Indentation correct? (should be solved via prepush-hook)

## Developer
- does your pattern work (oder: looks fine/good) in *every* supported browser (Browser-Support can be found here: https://atlassianp01.web.porsche.biz/confluence/pages/viewpage.action?pageId=38735694)

## Reviewer
- does the pattern work (oder: looks fine/good) in *one* of the supported browsers (Browser-Support can be found here: https://atlassianp01.web.porsche.biz/confluence/pages/viewpage.action?pageId=38735694)

## Designer
- check the look of the PR  
