# Typography
Typography plays an important role for the general brand impression and is indispensable for the use in digital applications, not to say: Typography **is** the interface. Typography enables meaningful information with well structured hierarchy and is therefore one of the most important elements to provide user guidance.

---

## Typeface: Porsche Next

The special Porsche feeling and the high recognisability across different touchpoints is decisively shaped by the use of the corporate typeface Porsche Next, which has been exclusively designed for Porsche. Therefore it is the only typeface allowed to be used for Porsche in both print and digital media.

Formally, the impression of the Porsche Next is largely determined by the visual character of the "squircle", a combination of square and circle, which is reflected in the curves and circular shapes of the typeface.

![Porsche Next Squircles](./assets/typography-squircle.png)

### Download

You can download the [Porsche Next font here](https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip).

### Language versions

The Porsche Next contains all typeface characters required for European, Greek and Cyrillic languages. Arabic, Pashtu, Persian and Urdu are not yet supported by the Porsche Design System but available as separate typeface packages on request.

#### Chinese / Japanese / Korean
For Chinese, Japanese and Korean language the `sans-serif` system fonts are to be used, sticking to the default Porsche font scaling system.

---


## Headline styles

The Porsche headline styles should only be used for first-level headlines whose function is to lead a page, section or content area. For Porsche headlines styles, only semibold weight is used to provide a good readability and making it as easy as possible to focus on the content sections of a page. The headline styles span from large title, that can be used optionally and only once per page, to headlines 1 to 5 that can be used multiple times.

|                  | 320 - 759 px (XS)     | 760 - 999 px (S)   | 1000 - 1299 px (M)   | 1300 - 1759 px (L)   | 1760  px or larger (XL)   |
|------------------|---------------------  |------------------	|-------------------   |-------------------   |------------------------   |
| Large Title      | 32 px         | 42 px   | 52 px     | 62 px    | 72 px           | 
| Headline-1       | 28 px       | 36 px   | 44 px      | 52 px     | 60 px          | 
| Headline-2       | 24 px       | 30 px  | 36 px    | 42 px   | 48 px             | 
| Headline-3       | 20 px       | 24 px   | 28 px    | 32 px        | 36 px         | 
| Headline-4       | 16 px         | 18 px   | 20 px     | 22 px    | 24 px          | 
| Headline-5       | 16 px         | 16 px   | 16 px     | 16 px    | 16 px          | 

![Headline example](./assets/typography-headlines.png)

### Applying headline styles

Depending on your layout, you don't necessarily have to start with headline 1. Also, it is possible to skip headline sizes whenever it serves the information structure.
It is much more important to keep an eye on a homogeneous use of text sizes within one application.
Also, please note that the headline class namings don't necessarily refer to the HTML font tags. For example the style headline 1 can also technically be implemented as `<h2>`.

### Headline-subline combinations

A first-level headline can be supplemented by a corresponding subline. Sublines must be set in Regular using an "additional sizes" class with minimum 16px size.

| Headline size    | Subline size                                      |
|------------------|-------------------------------------------------  |
| 16-18 px         | 16 px                                             |
| 20-42 px         | Min. 2 sizes smaller (see Porsche type scale)     |
| 44 px or larger  | Min. 4 sizes smaller (see Porsche type scale)     |

Examples:

![Headline-subline combinations](./assets/typography-headline-subline.png)


## Copy styles

The Porsche copytext styles are typically to be used for long-form writing. The default copytext size is 16px, which is represented by the **text small** style. The copy **text x-small** is only recommended for additional, low-informative text such as disclaimers or captions. Copy text keeps the respective text size throughout all viewports.

| Copy text              | Font size      | Available states                           | 
|------------------------- |---------------- |--------------------------------------------- |
| Text Small (default)     | 16 px           | active, default, disabled, highlight, linked | 
| Text X-Small  | 12 px    | active, default, disabled, highlight, linked | 


![Copytext states](./assets/typography-copytext-states.png)
 

## Additional styles

For short text parts that are not explicitly a page or section headline, but need a bit more focus or should be displayed larger due to aesthetic purpose, you can stick to the additional sizes provided in the Porsche Design System. There are <strong><span style="color: #00D5B9">predefined default text sizes</span></strong>, which should cover most use cases.

| Additional text size                | Font size       |
|------------------------- |---------------- |
| Text Medium     | 24 px           |
| Text Large  | 36 px    |
| Text X-Large  | 52 px    |

Depending on the information level of the respective text you can either chose between regular or thin weight. In both cases legibility should be ensured.

![Additional text sizes](./assets/typography-additional-sizes.png)


### Porsche type scale
Additional text sizes can be defined based on the Porsche type scale system. 

<p-text size="x-small" tag="span" color="inherit" class="type-scale highlight">12</p-text>
<p-text tag="span" color="inherit" class="type-scale highlight">16</p-text>
<p-text size="inherit" tag="span" class="type-scale f-18">18</p-text>
<p-text size="inherit" tag="span" class="type-scale f-20">20</p-text>
<p-text size="inherit" tag="span" class="type-scale f-22">22</p-text>
<p-text size="medium" tag="span" color="inherit" class="type-scale highlight">24</p-text>
<p-text size="inherit" tag="span" class="type-scale f-28">28</p-text>
<p-text size="inherit" tag="span" class="type-scale f-30">30</p-text>
<p-text size="inherit" tag="span" class="type-scale f-32">32</p-text>
<p-text size="large" tag="span" color="inherit" class="type-scale highlight">36</p-text>
<p-text size="inherit" tag="span" class="type-scale f-42">42</p-text>
<p-text size="inherit" tag="span" class="type-scale f-44">44</p-text>
<p-text size="inherit" tag="span" class="type-scale f-48">48</p-text>
<p-text size="x-large" tag="span" color="inherit" class="type-scale highlight">52</p-text>
<p-text size="inherit" tag="span" class="type-scale f-60">60</p-text>
<p-text size="inherit" tag="span" class="type-scale f-62">62</p-text>
<p-text size="inherit" tag="span" class="type-scale f-72">72</p-text>
<p-text size="inherit" tag="span" class="type-scale f-84">84</p-text>

### Line height

For reasons of legibility, the line height should always be adjusted to the respective text size. The text styles provided work with a 4 px baseline unit that fits to the [8 px spacing system](#/components/spacing) in order to follow a harmonious overall vertical rhythm.

### Type Scale Calculator
  
Enter a font-size in px unit based on Porsche Type Scale.  
<input type="number" v-model="size" />

```
{{this.typeScale(size +'px')}}
```

**Example Text**
<p-text size="inherit" :style="typeScale(size +'px', false)">The quick brown fox jumps over the lazy dog</p-text>

---

## Font styling

### Text color

The color to be used for Porsche Next depends on the [Porsche color theme](#/components/color) in use. In order to support both simplicity and legibility (sufficient contrast), default text is either to be set in Porsche Black or Porsche Light. For copytext sizes the Porsche color themes also provide different text state colors, such as Porsche Red for active states or Porsche Grey for disabled text.

### Font weights

The Porsche Next is available in different font weights that enable to add emphasis and create a visual content hierarchy.
For digital applications, we recommend only to use semibold, regular and thin:

- **Porsche Next Semibold** for first-level headlines.
- **Porsche Next Bold** for copytext highlights.
- **Porsche Next Regular** for copytext, stand-alone text or sublines (in combination with first-level headlines).
- **Porsche Next Thin** for stand-alone text larger than 20px.

![Font Weights](./assets/typography-font-weights.png)

### Text alignment

Per default, the Porsche Next is always used left-aligned. In individual cases or certain components it can also be used centered,
but keep in mind to not exceed 3 text lines, as it is much harder to read. Right-aligned text is also possible in exceptional
cases, for example in tables where right-aligned numbers should support readability.

Please avoid…

- … using the font in block typesetting, as this does not correspond with the high-quality brand image.
- … mixing up different text alignments within one paragraph. Keep it straight and simple.

### Line length

The longer a text line gets, the harder it is for the user to jump from the end of the current line to the beginning of the next line. Therefore we should always aim at a line length that supports good readability.

For UI applications it is recommended to use [no more than 80 characters or glyphs per line](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html). This might differ a bit depending on the respective line height and viewport size and results in different pixel widths depending on the Porsche type class in use:

- Copytext X-Small (12 px): max. 400-450 px
- Copytext Small (16 px): max. 500-550 px
- Headlines and additional sizes (20-84 px): max. 700 up to max. 2700 px


### Multi-column text

Generally, text paragraphs should be set as single column. Multi-column text should never exceed 3 columns and is only allowed when it can be ensured that all text columns are in the visible viewport range ("above the fold"). The user should not have to scroll before being able
to read the full content.

### Paragraph spacing

The vertical spacing between copytext paragraphs should be at least 24px, which equals the space of one line of text in-between.

![Copytext paragraph spacing](./assets/typography-paragraph-spacing.png)


### Upper case
The usage of upper case text is possible, but should be handled with care, as upper case text is always a matter of readability.
Upper case text should only be used for:

- Exceptional, one-of-a-kind design cases like standing-out parts of a (graphical) composition or in sole design elements like a tag cloud.
- Special components for which readability is generally not critical (such as short tags).
- Proper names such as GTS or BOSE.

![Example for uppercase text](./assets/typography-uppercase.png)


## Typography principles

For Porsche web applications, good typography is…

### … functional.
Use typography to provide clear hierarchy, to organize content and to guide the user through the digital product journey.

### … clear.
Use typography to provide both efficiency and, from a more visual point of view, support for a clear and modern 
look and feel of the Porsche application.

### … readable.
Never use typography by the sake of itself or as "eye candy". It should always support the usability of 
a website by making text readable due to a good text color contrast and sufficient text sizes.

### … purposeful.
Use typography wisely and always keep an eye on the user's needs and the purpose of the content you want to communicate.

### … a matter of course.
Always use typography in a professional manner in order to support the exclusiveness and high-quality-standard of the brand.
This not only means to make use of the pre-defined type styles provided in the Porsche Design System, but also to follow the general rules
of good (micro) typography, such as using the right kind of apostrophes in the respective language. 

---

## Accessibility
As we stick to the common [WCAG 2.1 Standard](#/accessibility/guidelines),
you should always ensure a sufficient contrast ratio when designing with text. 
The combination of text and background color should pass the WCAG AA standard 
and have a contrast ratio of at least 4.5:1 for standard text size and 3:1 
for larger text sizes. 



Also, you should not rely on color only to convey information. 
When communicating element states with text (for example a password validation 
information in forms), make sure to always use additional text stylings to make it easy for visually impaired people to recognise
status information even if they can’t see the color – this is of even higher
importance the more critical the information is.

---

## Don'ts

### Text modifications

Please avoid to transform the Porsche Next manually (e.g. within Sketch or via CSS), as this would have a big and undesirable
impact on the origin character of the company typeface. This includes:

- No change of letter-spacing.
- No use of (drop) shadows on text.
- No formal change of letters (for example distortion).
- No use of outline borders on text.
- No use of opacity for text colors.
  
![Example for uppercase text](./assets/typography-donts.png)

<style lang="scss" scoped>
  @import '~@porsche-design-system/utilities/scss';
  
  .type-scale {
    display: inline-block;
    margin-right: 1rem;
    
    &.highlight {
      color: #00D5B9;
    }
    
    &.f-18 {
      @include p-type-scale(18px);
    }
    
    &.f-20 {
      @include p-type-scale(20px);
    }
    
    &.f-22 {
      @include p-type-scale(22px);
    }
    
    &.f-28 {
      @include p-type-scale(28px);
    }
    
    &.f-30 {
      @include p-type-scale(30px);
    }
    
    &.f-32 {
      @include p-type-scale(32px);
    }
    
    &.f-42 {
      @include p-type-scale(42px);
    }
    
    &.f-44 {
      @include p-type-scale(44px);
    }
    
    &.f-48 {
      @include p-type-scale(48px);
    }
    
    &.f-60 {
      @include p-type-scale(60px);
    }
    
    &.f-62 {
      @include p-type-scale(62px);
    }
    
    &.f-72 {
      @include p-type-scale(72px);
    }
    
    &.f-84 {
      @include p-type-scale(84px);
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { convertLineHeight } from '@porsche-design-system/utilities';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public size: string = '16';
    public typeScale(fontSize: string, comment: boolean = true): string {
      const fittedLineHeightFactor = convertLineHeight(fontSize);
      const fittedLineHeightPx = Math.round(fontSize.slice(0, -2) * fittedLineHeightFactor);
      const fontSizeRem = fontSize.slice(0, -2) / 16;
      
      if (comment) {
        return "font-size: "+ fontSizeRem +"rem; // "+ fontSize +"\nline-height: "+ fittedLineHeightFactor +"; // "+ fittedLineHeightPx +"px";
      }
      
      return "font-size: "+ fontSizeRem +"rem; line-height: "+ fittedLineHeightFactor +";";
    }
  }
</script>
