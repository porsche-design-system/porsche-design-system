# Typography
Typography plays an important role for the general brand impression and is indispensable for the use in digital applications - not to say: Typography **is** the interface. Typography enables meaningful information with well structured hierarchy and is therefore one of the most important elements to provide user guidance.

---

## Typeface: Porsche Next

The special Porsche feeling and the high recognisability across different touchpoints is decisively shaped by the use of the corporate typeface Porsche Next, that has been exclusively designed for Porsche. Therefore, it is the only typeface allowed to be used for Porsche in both print and digital media.

Formally, the impression of the Porsche Next is largely determined by the visual character of the "squircle", a combination of square and circle. which is reflected in the curves and circular shapes of the typeface.

![Porsche Next Squircles](./assets/typography-squircle.png)

### Download

You can download the [Porsche Next font here](http://cdn.ui.porsche.com/porsche-ui-kit/font/v1/Porsche_Next_Desktop_OTF_Lat-Gr-Cyr.zip). 

### Language versions

The Porsche Next contains all typeface characters required for European, Greek and Cyrillic languages. Arabic, Pashtu, Persian and Urdu are not yet supported by the Porsche UI Kit but available as seperate typeface pack on request.

#### Chinese / Japanese
For Chinese and Japanese language, the following system fonts are to be used, sticking to the default Porsche font scaling system:

- Chinese: 黑体, SimHei, 宋体, SimSun
- Japanese: MS PGothic

---


## Headline styles

The Porsche headline styles should only be used for first-level headlines whose function is to lead a page, section or content area. For Porsche headlines styles only bold weight is used to provide a good readability and making it easy as possible to focus on the content sections of a page. The headline styles span from Large Title, that can be used optionally and only once per page, to headlines 1 to 4 that can be used multiple times.

|                  | 320 - 759 px (XS)     | 760 - 999 px (S)   | 1000 - 1299 px (M)   | 1300 - 1759 px (L)   | 1760  px or larger (XL)   |
|------------------|---------------------  |------------------	|-------------------   |-------------------   |------------------------   |
| Large Title      | 32 px         | 42 px   | 52 px     | 62 px    | 72 px           | 
| Headline-1       | 28 px       | 36 px   | 44 px      | 52 px     | 60 px          | 
| Headline-2       | 24 px       | 30 px  | 36 px    | 42 px   | 48 px             | 
| Headline-3       | 20 px       | 24 px   | 28 px    | 32 px        | 36 px         | 
| Headline-4       | 16 px         | 18 px   | 20 px     | 22 px    | 24 px          | 

![Headline example](./assets/typography-headlines.png)

### Applying headline styles

Depending on your layout, you don't necessarily have to start with headline 1. Also, it is possible to skip headline sizes whenever it serves the information structure.
It is much more important to keep an eye on a homogeneous use of text sizes within one application.
Also, please note that the headline class namings don't necessarily refer to the HTML font tags. For example the style headline 1 can also technically be implemented as `<h2>`.

### Headline-subline combinations

A first-level headline can be supplemented by a corresponding subline. Sublines must be set in Regular using an "Additional sizes" class with minimum 16 px size.

| Headline size    | Subline size                                      |
|------------------|-------------------------------------------------  |
| 16-18 px         | 16 px                                             |
| 20-42 px         | Min. 2 sizes smaller (see Porsche type scale)     |
| 44 px or larger  | Min. 4 sizes smaller (see Porsche type scale)     |

Examples:

![Headline-subline combinations](./assets/typography-headline-subline.png)


## Copy styles

The Porsche copy text styles are typically to be used for long-form writing. The default copy text size is 16 px, which is represented by the **text small** style. The copy **text x-small** is only recommended for additional, low-informative text such as disclaimers or captions. Copy text keeps the respective text size throughout all viewports.

| Copy text              | Font size      | Available states                           | 
|------------------------- |---------------- |--------------------------------------------- |
| text small (default)     | 16 px           | active, default, disabled, highlight, linked | 
| text x-small  | 12 px    | active, default, disabled, highlight, linked | 


![Copytext states](./assets/typography-copytext-states.png)
 

## Additional styles

For short text parts that are not explicitly a page or section headline, but need a bit more focus or should be displayed larger due to aesthetic purpose, you can stick to the additional sizes provided in the Porsche UI Kit. There are <strong><span style="color: #00D5B9">predefined default text sizes</span></strong>, which should cover most use cases.

| Additional text size                | Font size       |
|------------------------- |---------------- |
| text medium     | 24 px           |
| text large  | 36 px    |
| text x-large  | 52 px    |

Depending on the information level of the respective text you can either chose between regular or thin weight. In both cases legibility should be ensured.

![Additional text sizes](./assets/typography-additional-sizes.png)


### Porsche type scale
Additional text sizes can be defined based on the Porsche type scale system. 

<p-text size="x-small" tag="span" style="display: inline-block; margin-right: 16px">12</p-text>
<p-text tag="span" style="display: inline-block; margin-right: 16px">16</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 18px;">18</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 20px;">20</p-text>
<p-text size="medium" tag="span" style="display: inline-block; margin-right: 16px"><span style="color: #00D5B9">24</span></p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 28px;">28</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 30px;">30</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 32px;">32</p-text>
<p-text size="large" tag="span" style="display: inline-block; margin-right: 16px"><span style="color: #00D5B9">36</span></p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 42px;">42</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 44px;">44</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 48px;">48</p-text>
<p-text size="x-large" tag="span" style="display: inline-block; margin-right: 16px"><span style="color: #00D5B9">52</span></p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 60px;">60</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 62px;">62</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; margin-right: 16px; font-size: 72px;">72</p-text>
<p-text size="inherit" tag="span" style="display: inline-block; font-size: 84px;">84</p-text>

### Line height

For reasons of legibility, the line height should always be adjusted to the respective text size. It is recommended that the line height should be [at least 150% of the text size in use](https://www.w3.org/TR/WCAG20-TECHS/C21.html). The text styles provided do not only follow this recommendation, but also work with a 4 px baseline unit that fits to the [8 px spacing system](#/web/layout/spacing)  in order to follow a harmonious overall vertical rhythm.


---

## Font styling

### Text color

The color to be used for Porsche Next depends on the [Porsche Color Theme](#/web/basic/color) in use. In order to support both simplicity and and legibility (sufficient contrast) default text is either to be set in Porsche Black or Porsche Light. For copytext sizes the Porsche Color Themes also provide different text state colors, such as Porsche Red for active states or Grey for disabled text.

### Font weights

The Porsche Next is available in different font weights that enable to add emphasis and create a visual content hierarchy.
For digital applications, we recommend only to use Bold, Regular and Thin:

- **Porsche Next Bold** for first-level headlines or copytext highlights.
- **Porsche Next Regular** for copytext, stand-alone text or sublines (in combination with first-level headlines).
- **Porsche Next Thin** for stand-alone text larger than 20 px.

![Font Weights](./assets/typography-font-weights.png)

### Text alignment

Per default, the Porsche Next is always used left-aligned. In individual cases or certain components it can also be used centered,
but keep in mind not to exeed 3 text lines, as it is much harder to read. Also, right-aligned text is possible in exceptional
cases, for example in tables where right-aligned numbers support readability.

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

Text paragraphs should always preferably be set as single column. Multi-column text should never acceed 3 columns and is only allowed when it can be ensured that all text columns are in the visible viewport range ("above the fold"). The user should not have to scroll before being able
to read the full content.

### Paragraph spacing

The vertical spacing between copy text paragraphs should be at least 24 px, which equals the space of one line of text in-between.

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
Use typography to provide both efficiency and, from a more visual point of view, to support the clear and modern 
look and feel of a Porsche application.

### … readable.
Never use typography by the sake of itself or as "eye candy". It should always support the usability of 
a website by making text readable due to a good text color contrast and sufficient text sizes.

### … purposeful.
Use typography wisely and always keep an eye on the user's needs and the purpose of the content you want to communicate.

### … a matter of course.
Always use typography in a professional manner in order to support the exclusiveness and high-quality-standard of the brand.
This not only means to make use of the pre-defined type styles provided in the Porsche UI Kit, but also to follow the general rules
of good (micro) typography, such as using the right kind of apostrophes in the respective language. 

---

## Accessibility
As we stick to the common [WCAG 2.1 Standard](#/web/basics/accessibility-criteria)
you should always ensure a sufficient contrast ratio when designing with text. 
The combination of text and background color should pass the WCAG AA standard 
and have a contrast ratio of at least 4.5:1 for standard text size and 3:1 
for larger text sizes. 



Also, you should not rely on color only to convey information. 
When communicating element states with text (for example a password validation 
information in forms) make sure to always use additional text stylings 
(e.g. bold text) to make it easy for visually impaired people to recognise
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