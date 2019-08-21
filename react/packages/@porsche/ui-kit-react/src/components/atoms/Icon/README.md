# Generating React Components from SVGs

So you want to add or update an icon from a svg file? Very good, I like it. But you probably don't want to do it by hand. To be able to automatically generate Typescript React components from svg files using [https://github.com/smooth-code/svgr](svgr) everybody needs to follow a couple rules when creating svg files:

Important: The paths need to be converted to contourlines right before export (eg. Illustrator)

1.  Every black (#000 or #000000) fill will be replaced with "currentColor" so that we can change the color of the icon using the css color attribute

2.  Every white (#fff or #ffffff) fill will be replaced with "none". Use this to create masks.

3.  Every other color will be kept statically and won't change no matter what css class is set. This is almost certainly never a use case, so don't use any other color than black or white.

4.  The width and size of the svg is replaced with "1em" so that we can change the size of the icon using the css font-size attribute.

5.  Run `yarn run render:svg` to compile the svg files to react components.
