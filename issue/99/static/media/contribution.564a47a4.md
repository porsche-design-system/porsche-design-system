# Contributing

## Component sheet  
All library components are to be placed on a uniform "component sheet" layout (Sketch artboard). You can find it here to download: https://github.com/porscheui/porsche-ui-kit/wiki/Library-Template  
  
## Standards  
What should be considered when setting up a (core) component? 
  
### Ease of Use
☝🏻 **First and foremost: Always keep the library user a.k.a. UI designer in mind when designing library components!**  
  
The following questions might help:  
  
* How is the component expected to be embedded in the layout?
* How flexible should the component to be used?
* How should we handle different component variants? (→ You should always enable a quick and easy 1:1 replacement.)
* How will the user insert the component? (→ Think step by step!)

### Nesting  
All nested elemens should have a fluent behaviour, which means that their width should always be determined by the parent element they are nested in.  
  
### Theming 
All symbols should be provided for light background (= standard) and dark background (= inverted).
  
### Component background
All inverted symbols should be placed on a dark artboard background (Grey 10 = #191F22) so that they can be easily distinguished from symbols with standard theming. As that is only for displaying purposes, please make sure to deactivate the options "Include in export" and "Include in instances" in the symbol's artboard options.  
  
### Component Naming
- FOLGT ⚒ -  
    
## Component States  
Within the Porsche UI Kit, we agreed on using the following set (and naming) of component states. Depending on the specific component, not every state is necessarily needed. Generally, all required component states should be considered when designing Porsche UI Kit components in Sketch, as the developer needs them as implementation blueprint. 
  
* **Default** 
* **Hover** = mouseover
* **Active** = active / selected state
* **Disabled** = component is not clickable
* **Error** 
* **Success**
* **Focus** = highlighted state, important for Accessibility reasons, when the user jumps through interactive elements via tab key
  
### Accessibility  
In order to match our [accessibility criteria](https://github.com/porscheui/porsche-ui-kit/wiki/Accessibility), you should keep an eye on the following attributes when designing a UI Kit component:  
  
* Sufficient text size  
* Sufficient contrasts (at least AA level)
  
You can easily check the contrast by using the Sketch plugin [Color Contrast Analyser](https://github.com/getflourish/Sketch-Color-Contrast-Analyser), which checks all selected elements on WCAG standard. Here's how to use it:  
  
1. Select one or more layers within your component (by selecting multiple layers at once it measures the contrast inbetween these elements, by selecting only one layer it measures the contrast to the underlying background).
2. Plugins → Color Contrast Analyser
3. The result is shown at the bottom of the Sketch app.  
  
### Uniqueness
  
All elements within a component have to be **unique**, which means neither the symbol itself nor the nested elements should be manually adjusted duplicates of other symbols. A good example is the usage of different text styles: Let's say you have two buttons - both come with the same text style (e.g. copytext), but with different text alignments. For both you should set up unique text styles, e.g. one left-aligned and the other centered. You should not use the left-aligned style for both and overwrite one manually with 'centered' in the typography panel.  
  
### Symbol Overrides
  
When providing symbol overrides we should consider the following aspects:  
  
**As many as necessary, as few as possible.**  
We should try to keep the number of overrides neat and manageable to make the usage of the library for the user as nice and handy as possible.  
  
**Prevent unused overrides**  
Layers that are not supposed to be overrides, should not appear in the override panel at all. Just lock the specific layer and it won't disturb the user.  
  
**Order of layers**  
Keep an eye on the order of the layers that are placed within the symbol. They refer to the order of the override options in the override panel. So, always make sure that the override layers are positioned top down.
  
**Naming of override layers**  
The names of layers appear as labels in the override panel. Therefore, we replace them with a nice and meaningful text, e.g. 'Button label' or 'Icon color'.
  
**Icons**  
In order to optimize the recognizability of the override options (even more so in symbols with a higher complexity level), we extend the override layer names with icons. Works like a charm!
  
★ = Icon Override  
🌈 = Color Override  
𝒜 = Text Override  
🔄 = Status Override (z.B. 'active position')  
🏞 = Image Override  
  
### Component Behaviour
Not all properties of a component can be displayed visually (e.g. click/touch areas, which go beyond the visible area / clickable areas in general, etc.). These are to be displayed separately on the Component Sheet (Artboard) in the area "Component Behaviour".
