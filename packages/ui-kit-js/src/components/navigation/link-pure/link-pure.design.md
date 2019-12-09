# Link Pure

Link Pure is a clickable icon-text-combination used to **navigate the user to another page**. It can be used as a more subtle call to action compared to Link Primary, Secondary and Tertiarty. (In case you want the user to execute an action, you should select the [Button](#/web/action/button) or [Button Pure](#/web/action/button-pure) component instead.)

---

## Available sizes

Per default, the Link Pure is set in **copytext size**. If another size or hierarchy level is needed, the Link Pure is available in the following sizes, whereas the size of the icon changes accordingly. 

| Button Pure size | Font size | Example |
|------|------|------|
| X-Small | 12 px | <span style="color:#FF0090;">Link Pure [INSERT CODE EXAMPLE]</span> |
| Small | 16 px | <span style="color:#FF0090;">Link Pure [INSERT CODE EXAMPLE]</span> |
| Medium | 24 px | <span style="color:#FF0090;">Link Pure [INSERT CODE EXAMPLE]</span> |
| Large | 36 px | <span style="color:#FF0090;">Link Pure [INSERT CODE EXAMPLE]</span> |
| X-Large | 52 px | <span style="color:#FF0090;">Link Pure [INSERT CODE EXAMPLE]</span> |

---

## Available variants

### Icon and Text

<span style="color:#FF0090;">[ INSERT CODE EXAMPLE IN LARGE ]</span>

This should be the variant of your choice whenever possible, as icons should preferably always be paired with text for better comprehensibility and accessibility.

### Icon only

<span style="color:#FF0090;"> INSERT CODE EXAMPLE IN LARGE ]</span>

When it's enough to indicate an interaction with an icon only, the text label can be hidden. Yet, it's recommended to use this variant only in cases when the user is fully aware of the function due to an expressive and internationally comprehensible icon.


---

## States

The Link Pure covers the following states:

* Default
* Active
* Hover
* Disabled
* Loading
* Focus

---


## Content

### Icon
The default icon is an arrow right that can be replaced by any icon available in the Porsche web icon set. It should be changed only if it is ensured that another symbol is more appropriate to support the text content, making it easier for the user to understand the function quickly.  

#### External and internal links
For internal links the arrow should be sufficient in most cases. External links can be displayed with the following icon: 

<span style="color:#FF0090;">[ LINK PURE EINFÜGEN MIT LABEL "External Link" UND EXTERN-ICON ]
<p-icon name="link-extern" size="x-small" aria-label="Extern link"></p-icon></span>

### Text label 

The text label within a link should always be short and descriptive.

---


## Special cases

### Link Pure on images

A Link Pure can be placed on images, e.g. when using it as an additional link on image sliders or teaser images that are clickable themselves. In this case, the link pure can give the user an additional hint on the clickability of the whole image. Make sure to always use regular font-weight in links pure that are placed on images to provide legibility.

### Additional subtext

A link pure in 20 px or larger can be accompanied by an additional copytext with lower hierarchy. In this case, the copytext should be placed left-aligned with the link text in the link pure component.

### Link Pure groups

Multiple Links Pure can be combined to one Button Pure group that must be stacked left-aligned in order to guarantee scannability and legibility. It is recommended to not group more than 6 Links Pure in a row.


<div style="background:#F2F2F2; width:100%; margin-top: 64px; padding-top: 32px; padding-left: 42px; padding-bottom: 42px;">
    <p-headline variant="headline-3" tag="h3" style="margin-bottom: 24px;">Examples</p-headline>
    <img src="./assets/link-pure.png"/>
</div>


