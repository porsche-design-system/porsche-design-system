'use client';

import type {
  ElementConfig,
  HTMLTagOrComponent,
  SlotStories,
  Story,
  StoryState,
} from '@porsche-design-system/story-generator';

type TileState = StoryState<'p-tile'>;

const anchorHref = 'https://porsche.com';
const anchorLabel = 'Some label';
const secondaryHref = 'https://porsche.com/international/models';

const hasAnchor = (state?: TileState): boolean => !!state?.slots?.anchor;

// slot stories containing a `p-link` with `cover`, so independent interactive elements know they have to be placed above it
const coverLinkStories = new Set<Story<'p-tile'>>();
const withCoverLink = (story: Story<'p-tile'>): Story<'p-tile'> => {
  coverLinkStories.add(story);
  return story;
};
const hasCoverLink = (state?: TileState): boolean =>
  Object.values(state?.slots ?? {}).some((story) => coverLinkStories.has(story as Story<'p-tile'>));

const getClassName = (...classNames: (string | false | undefined)[]): { className?: string } => {
  const className = classNames.filter(Boolean).join(' ');
  return className ? { className } : {};
};

// while an anchor is slotted, all other content is click-through, so independent interactive elements have to opt in;
// a covering link is placed above all content, so they have to be placed above it
const getIndependentClassName = (state?: TileState): string | undefined => {
  if (hasAnchor(state)) {
    return 'pointer-events-auto';
  }
  return hasCoverLink(state) ? 'relative z-2' : undefined;
};

// a link with `cover` makes the whole tile clickable; while an anchor is slotted, it duplicates the anchor instead, so it
// is hidden from assistive technology and keyboard and stays click-through
const createCoverLink = (
  state: TileState | undefined,
  slot: string | undefined,
  properties: Record<string, unknown> = {}
): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'p-link',
  properties: {
    ...(slot && { slot }),
    href: anchorHref,
    ...properties,
    ...(hasAnchor(state) ? { 'aria-hidden': 'true', tabIndex: -1 } : { cover: true }),
  },
  children: [anchorLabel],
});

const createIconCoverLink = (state: TileState | undefined, slot: string, icon: 'arrow-right' | 'arrow-up-right') =>
  createCoverLink(state, slot, {
    className: 'ms-auto',
    variant: 'secondary',
    icon,
    hideLabel: true,
    compact: true,
  });

const createHeading = (
  slot: string | undefined,
  size: 'sm' | 'md' | 'lg',
  properties: Record<string, unknown> = {}
): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'p-heading',
  properties: { ...(slot && { slot }), tag: 'h3', size, ...properties },
  children: ['Some heading'],
});

const createText = (children: string, properties: Record<string, unknown> = {}): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'p-text',
  properties,
  children: [children],
});

const createTextSlotStory = (slot?: string): Story<'p-tile'> => ({
  name: 'Text',
  generator: () => [createText(`Some ${slot ?? 'default'} content`, slot ? { slot } : {})],
});

const createProductImageSlotStory = (slot?: 'start' | 'end'): Story<'p-tile'> => ({
  name: 'Product image',
  generator: () => [
    {
      // `grow basis-0 min-h-0` fills the available height without increasing the height of the tile, `object-contain`
      // centers the image within it
      tag: 'img',
      properties: {
        ...(slot && { slot }),
        className: 'grow basis-0 min-h-0 w-full object-contain',
        src: 'assets/weekender.webp',
        alt: '',
        width: 960,
        height: 1080,
      },
    },
  ],
});

export const tileSlotStories: SlotStories<'p-tile'> = {
  default: {
    text: createTextSlotStory(),
    headingAndText: {
      name: 'Heading and text',
      generator: () => [createHeading(undefined, 'lg'), createText('Some text')],
    },
    headingTextAndLinks: withCoverLink({
      name: 'Heading, text and links',
      generator: (state) => [
        createHeading(undefined, 'sm', { align: 'center' }),
        createText('Some text', { size: 'xs', color: 'contrast-medium', align: 'center' }),
        {
          tag: 'div',
          properties: { className: 'flex flex-wrap justify-center items-center gap-static-md mt-fluid-sm' },
          children: [
            createCoverLink(state, undefined, { variant: 'primary' }),
            {
              tag: 'p-link',
              properties: {
                ...getClassName(getIndependentClassName(state)),
                variant: 'secondary',
                href: secondaryHref,
              },
              children: ['Some secondary link'],
            },
          ],
        },
      ],
    }),
    image: {
      name: 'Image',
      generator: () => [
        {
          // with `bleed`, the image reaches the edges of the tile that aren't occupied by another layout slot
          tag: 'img',
          properties: {
            className: 'aspect-video',
            src: 'assets/porsche-992-carrera-s.jpg',
            alt: 'Rear view of a Porsche 911 Carrera S',
          },
        },
      ],
    },
    modelImage: {
      name: 'Model image',
      generator: () => [
        {
          tag: 'img',
          properties: { src: 'assets/model-series/911.webp', alt: 'Porsche 911', width: 640, height: 228 },
        },
      ],
    },
    modelSignature: {
      name: 'Model signature, text and image',
      generator: () => [
        { tag: 'p-model-signature', properties: { model: '911' } },
        createText('Porsche 911'),
        {
          tag: 'img',
          properties: {
            className: 'mt-static-sm',
            src: 'assets/model-series/911.webp',
            alt: 'Porsche 911',
            width: 640,
            height: 228,
          },
        },
      ],
    },
    productImage: createProductImageSlotStory(),
    cutOutImage: {
      name: 'Cut-out image',
      generator: () => [
        {
          // the cut-out image starts at the top of its box, `[clip-path:none]` lets it grow beyond the box on zoom
          // instead of being clipped at an invisible edge; intended to be used with `bleed`
          tag: 'img',
          properties: {
            className: 'object-top [clip-path:none]',
            src: 'assets/products/roof-box-on-a-car.webp',
            alt: 'Porsche vehicle with roof box',
          },
        },
      ],
    },
  },
  top: {
    text: createTextSlotStory('top'),
    heading: {
      name: 'Heading',
      generator: () => [createHeading('top', 'md')],
    },
    headingAndLink: withCoverLink({
      name: 'Heading and link',
      generator: (state) => [
        createHeading('top', 'md', { weight: 'semibold' }),
        createIconCoverLink(state, 'top', 'arrow-right'),
      ],
    }),
    link: withCoverLink({
      name: 'Link',
      generator: (state) => [createIconCoverLink(state, 'top', 'arrow-up-right')],
    }),
    tagAndButton: {
      name: 'Tag and button',
      generator: (state) => [
        { tag: 'p-tag', properties: { slot: 'top', variant: 'secondary' }, children: ['Some tag'] },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'top',
            ...getClassName('ms-auto p-static-xs -m-static-xs', getIndependentClassName(state)),
            icon: 'heart',
            hideLabel: true,
          },
          children: ['Some action'],
        },
      ],
    },
  },
  bottom: {
    text: createTextSlotStory('bottom'),
    link: {
      name: 'Link',
      generator: (state) => [
        {
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            ...getClassName(getIndependentClassName(state)),
            href: secondaryHref,
          },
          children: ['Some link'],
        },
      ],
    },
    twoLinks: withCoverLink({
      name: 'Two links',
      generator: (state) => [
        createCoverLink(state, 'bottom'),
        {
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            ...getClassName(getIndependentClassName(state)),
            href: secondaryHref,
            variant: 'secondary',
          },
          children: ['Some secondary link'],
        },
      ],
    }),
    headingAndLink: withCoverLink({
      name: 'Heading and link',
      generator: (state) => [
        createHeading('bottom', 'md', { weight: 'semibold' }),
        createIconCoverLink(state, 'bottom', 'arrow-right'),
      ],
    }),
    tag: {
      name: 'Tag',
      generator: () => [{ tag: 'p-tag', properties: { slot: 'bottom' }, children: ['Some tag'] }],
    },
    headingAndText: {
      name: 'Heading and text',
      generator: () => [
        {
          // `grow` lets the content span the full width of the `bottom` slot, which lays out its items as a row
          tag: 'div',
          properties: { slot: 'bottom', className: 'grow flex flex-col gap-fluid-sm' },
          children: [createHeading(undefined, 'lg'), createText('Some text')],
        },
      ],
    },
    nameAndPrice: {
      name: 'Name and price',
      generator: () => [
        {
          tag: 'div',
          properties: { slot: 'bottom', className: 'grow flex flex-col items-center gap-static-xs' },
          children: [
            createText(anchorLabel, { className: 'line-clamp-2', align: 'center' }),
            createText('1.100,00 €', { color: 'contrast-medium', align: 'center' }),
          ],
        },
      ],
    },
    headingTextAndActions: withCoverLink({
      name: 'Heading, text and actions',
      generator: (state) => [
        {
          tag: 'div',
          properties: { slot: 'bottom', className: 'grow flex flex-col gap-fluid-sm' },
          children: [
            createHeading(undefined, 'lg'),
            createText('Some text'),
            {
              tag: 'div',
              properties: { className: 'flex flex-wrap gap-static-md' },
              children: [
                createCoverLink(state, undefined),
                {
                  tag: 'p-button',
                  properties: {
                    ...getClassName(getIndependentClassName(state)),
                    type: 'button',
                    variant: 'secondary',
                    icon: 'bookmark',
                  },
                  children: ['Some action'],
                },
              ],
            },
          ],
        },
      ],
    }),
  },
  start: {
    text: createTextSlotStory('start'),
    headingTextAndLink: withCoverLink({
      name: 'Heading, text and link',
      generator: (state) => [
        createHeading('start', 'lg'),
        createText('Some text', { slot: 'start' }),
        createCoverLink(state, 'start', { className: 'mt-fluid-sm', variant: 'secondary' }),
      ],
    }),
    productImage: createProductImageSlotStory('start'),
  },
  end: {
    text: createTextSlotStory('end'),
    productImage: createProductImageSlotStory('end'),
  },
  background: {
    image: {
      name: 'Image',
      generator: () => [{ tag: 'img', properties: { slot: 'background', src: 'assets/lights.jpg', alt: '' } }],
    },
    picture: {
      name: 'Picture',
      generator: () => [
        {
          tag: 'picture',
          properties: { slot: 'background' },
          children: [
            { tag: 'source', properties: { media: '(min-width: 1000px)', srcSet: 'assets/lights.jpg' } },
            { tag: 'img', properties: { src: 'assets/ocean.jpg', alt: '' } },
          ],
        },
      ],
    },
    video: {
      name: 'Video',
      generator: () => [
        {
          tag: 'video',
          properties: {
            slot: 'background',
            src: 'assets/ocean.mp4',
            poster: 'assets/ocean.jpg',
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            'aria-hidden': 'true',
          },
        },
      ],
    },
  },
  anchor: {
    link: {
      name: 'Link',
      generator: () => [{ tag: 'a', properties: { slot: 'anchor', href: anchorHref }, children: [anchorLabel] }],
    },
  },
};

export const tileStory: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  state: {
    slots: {
      default: tileSlotStories.default.text,
      anchor: tileSlotStories.anchor.link,
    },
  },
  generator: (state = {}) => [
    {
      tag: 'p-tile',
      properties: state.properties,
      children: (['background', 'anchor', 'top', 'start', 'default', 'end', 'bottom'] as const).flatMap(
        (slot) => state.slots?.[slot]?.generator(state) ?? []
      ),
    },
  ],
};
