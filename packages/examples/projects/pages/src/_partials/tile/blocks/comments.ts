/**
 * The comments the tile patterns share. A pattern is copied on its own, so each technique is explained in every
 * pattern that uses it – in the same words, which is why they are defined once here.
 */
export const tileComments = {
  anchorTile: 'Positioned, so that its link can span the whole tile.',
  anchorLink: 'Spans the tile above its content, so the whole tile is clickable. Its text is for screen readers only.',
  coverTile:
    'Positioned, so that its covering link spans it. The cover radius variable gives the focus indicator of that link the corners of the tile.',
  coverLink: 'Covers the whole tile, so a single link names and opens it.',
  action: 'Placed above the link spanning the tile, so it stays clickable on its own.',
  zoom: 'Zooms in while the tile is hovered, unless the user prefers reduced motion.',
  clip: 'Clips the zooming media to the corners, which the tile cannot do without cutting off the focus indicator of its link.',
  textGradient:
    'Adopts the two rows of the tile, the lower one as high as the text. Its gradient is twice as high as that row, so the text lies in the dark half and stays legible on any image.',
  container: 'The tile follows the width of this wrapper rather than of the window, so it fits any column.',
  vehicleWidth: 'Its width is a share of the tile, so the vehicle keeps its scale at every size.',
  darkScheme: 'Light text on dark media, whatever the color scheme of the page.',
  moodImage: 'Decorative: it sets the mood and adds nothing to the text.',
  modelImage: 'Decorative, since the tile already names the model.',
  fill: 'Takes the height left in the tile, but no less than a share of its width, so enlarged text extends the tile rather than squeezing the image.',
  mediaPadding: 'Its padding keeps the distance to the heading and is the room the image zooms into.',
  ownHeight: 'Not stretched to its row, so that content exceeding the aspect ratio extends the tile in Safari too.',
  signatureWidth:
    'Signatures differ in width, Panamera being almost three times as wide as 911. The share below suits the narrow ones: set it anew for another model.',
} as const;
