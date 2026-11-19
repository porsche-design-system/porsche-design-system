/**
 * The comments the tile patterns share. A pattern is copied on its own, so each technique is explained in every
 * pattern that uses it – in the same words, which is why they are defined once here.
 */
export const tileComments = {
  anchorTile: 'The tile is the positioned ancestor of its link, so the link can span the whole tile.',
  anchorLink:
    'Spans the tile above its content, so the whole tile is clickable and hovering anywhere hovers the link. Its text is for screen readers only.',
  coverTile:
    'The tile is the positioned ancestor of the covering link, which makes the whole tile clickable and draws its focus indicator around the tile. The cover radius variable gives that indicator the corners of the tile.',
  coverLink: 'Covers the whole tile, so a single link names and opens it.',
  action: 'An independent action, placed above the link spanning the tile, so it stays clickable on its own.',
  zoom: 'Zooms in while the tile is hovered, unless the user prefers reduced motion.',
  clip: 'Clips the zooming media to the corners. The tile itself does not clip, since that would cut off the focus indicator of its link.',
  gradient: 'Carries the gradient behind the text, so it grows with the text and keeps it legible on the image.',
  darkScheme: 'Light content on a dark gradient or image, independent of the color scheme of the page.',
  moodImage: 'Decorative, it sets the mood and carries no information the text does not give.',
  modelImage: 'Decorative, since the tile already names the model.',
  optionImage: 'Decorative, since the heading names the option.',
  coverImage: 'Lies behind the content and covers the tile, following its corners itself.',
  fill: 'Takes the height left in the tile without increasing it.',
  ownHeight:
    'Aligned to the top of its row instead of stretched to it, so content needing more room than the aspect ratio provides extends the tile in Safari as well.',
  signatureWidth:
    'Signatures differ in width: 911 and 718 are the narrowest, Panamera is almost three times as wide. The share below suits the narrow ones, so for another model set it anew and check how far the vehicle overlaps the signature.',
} as const;
