import type { EventMeta, PropMeta } from '@porsche-design-system/component-meta';
import {
  cleanMarkup,
  convertMarkup,
  escapeHtml,
  formatEventType,
  formatPropDefaultValue,
  formatPropDescription,
  formatPropType,
  patchThemeIntoMarkup,
} from '../../src/utils';

import * as convertToAngularUtils from '@porsche-design-system/shared/utils/convertToAngular';
import * as convertToReactUtils from '@porsche-design-system/shared/utils/convertToReact';
import * as formattingUtils from '../../src/utils/formatting';

describe('cleanMarkup()', () => {
  it('should replace multiple br tags with new line', () => {
    const markup = '<div></div><br><div></div><br><div></div>';
    expect(cleanMarkup(markup)).toBe(`<div></div>
<div></div>
<div></div>`);
  });

  it('should replace multiple new lines', () => {
    const markup = '<div></div><br><br><div></div><br><br><br><div></div>';
    expect(cleanMarkup(markup)).toBe(`<div></div>

<div></div>

<div></div>`);
  });
});

describe('patchThemeIntoMarkup()', () => {
  it('should not add light theme to any tag', () => {
    const markup1 = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup1, 'light')).toBe(markup1);

    const markup2 = '<p-button some-attribute="some value"></p-button>';
    expect(patchThemeIntoMarkup(markup2, 'light')).toBe(markup2);
  });

  it('should not add light theme to unknown tag', () => {
    const markup = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
  });

  it('should add dark theme to themeable tag', () => {
    const markup = '<p-button some-attribute="some value"></p-button>';
    expect(patchThemeIntoMarkup(markup, 'dark')).toBe('<p-button theme="dark" some-attribute="some value"></p-button>');
  });

  it('should not add dark theme to unknown tag', () => {
    const markup = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup, 'dark')).toBe(markup);
  });

  it('should add auto theme to themeable tag', () => {
    const markup = '<p-button some-attribute="some value"></p-button>';
    expect(patchThemeIntoMarkup(markup, 'auto')).toBe('<p-button theme="auto" some-attribute="some value"></p-button>');
  });

  it('should not add auto theme to unknown tag', () => {
    const markup = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup, 'auto')).toBe(markup);
  });

  describe('in React', () => {
    it('should not add light theme', () => {
      const markup = '<PButton some-attribute="some value"></PButton>';
      expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
    });

    it('should not add light theme to unknown tag', () => {
      const markup = '<PSomeTag some-attribute="some value"></PSomeTag>';
      expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
    });

    it('should not add dark theme to unknown tag', () => {
      const markup = '<PSomeTag some-attribute="some value"></PSomeTag>';
      expect(patchThemeIntoMarkup(markup, 'dark')).toBe(markup);
    });

    it('should add dark theme', () => {
      const markup = '<PButton some-attribute="some value"></PButton>';
      expect(patchThemeIntoMarkup(markup, 'dark')).toBe('<PButton theme="dark" some-attribute="some value"></PButton>');
    });

    it('should not add auto theme to unknown tag', () => {
      const markup = '<PSomeTag some-attribute="some value"></PSomeTag>';
      expect(patchThemeIntoMarkup(markup, 'auto')).toBe(markup);
    });

    it('should add auto theme', () => {
      const markup = '<PButton some-attribute="some value"></PButton>';
      expect(patchThemeIntoMarkup(markup, 'auto')).toBe('<PButton theme="auto" some-attribute="some value"></PButton>');
    });
  });
});

describe('escapeHtml()', () => {
  it('should replace special characters', () => {
    const markup = '<a href="https://porsche.com?param1=x&param2=y" target="_blank">Link</a>';
    expect(escapeHtml(markup)).toBe(
      '&lt;a href=&quot;https://porsche.com?param1=x&amp;param2=y&quot; target=&quot;_blank&quot;&gt;Link&lt;/a&gt;'
    );
  });
});

describe('convertMarkup()', () => {
  const markup = 'some markup';
  const cleanedMarkup = 'some cleaned markup';
  const convertedMarkup = 'someConvertedMarkup';

  it('should call convertToAngular() and cleanMarkup() with correct parameters and return correct markup for framework angular', () => {
    const convertToAngularSpy = jest.spyOn(convertToAngularUtils, 'convertToAngular').mockReturnValue(convertedMarkup);
    const cleanMarkupSpy = jest.spyOn(formattingUtils, 'cleanMarkup').mockImplementationOnce(() => cleanedMarkup);

    expect(convertedMarkup).toBe(convertMarkup(markup, 'angular'));

    expect(cleanMarkupSpy).toHaveBeenCalledWith(markup);
    expect(convertToAngularSpy).toHaveBeenCalledWith(cleanedMarkup);
  });

  it('should call convertToReact() and cleanMarkup() with correct parameters and return correct markup for framework react', () => {
    const convertToReactSpy = jest.spyOn(convertToReactUtils, 'convertToReact').mockReturnValue(convertedMarkup);
    const cleanMarkupSpy = jest.spyOn(formattingUtils, 'cleanMarkup').mockReturnValue(cleanedMarkup);

    expect(convertedMarkup).toBe(convertMarkup(markup, 'react'));

    expect(cleanMarkupSpy).toHaveBeenCalledWith(markup);
    expect(convertToReactSpy).toHaveBeenCalledWith(cleanedMarkup);
  });

  it('should call cleanMarkup() with correct parameters and return correct markup for framework vanilla-js', () => {
    const cleanMarkupSpy = jest.spyOn(formattingUtils, 'cleanMarkup').mockReturnValue(cleanedMarkup);

    expect(cleanedMarkup).toBe(convertMarkup(markup, 'vanilla-js'));
    expect(cleanMarkupSpy).toHaveBeenCalledWith(markup);
  });
});

describe('formatPropDescription()', () => {
  it.each<PropMeta>([
    {
      description: 'The text size.',
      type: 'AccordionSize',
      defaultValue: 'small',
      isBreakpointCustomizable: true,
      allowedValues: ['small', 'medium'],
    },
    {
      description:
        '@deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead. Defines if the banner can be closed/removed by the user.',
      type: 'boolean',
      defaultValue: null,
      isDeprecated: true,
      allowedValues: 'boolean',
    },
    {
      description: '@experimental Disables the checkbox and shows a loading indicator.',
      type: 'boolean',
      defaultValue: false,
      isExperimental: true,
      allowedValues: 'boolean',
    },
    {
      description: 'When providing an url then the component will be rendered as `<a>`.',
      type: 'string',
      defaultValue: null,
      allowedValues: 'string',
    },
    {
      type: 'string',
      defaultValue: null,
      allowedValues: 'string',
    },
  ])('should return correctly formatted string for: %j', (meta) => {
    expect(formatPropDescription(meta)).toMatchSnapshot();
  });
});

describe('formatPropType()', () => {
  it.each<PropMeta>([
    {
      description: 'The text size.',
      type: 'AccordionSize',
      defaultValue: 'small',
      isBreakpointCustomizable: true,
      allowedValues: ['small', 'medium'],
    },
    {
      description: 'Adapts the color when used on dark background.',
      type: 'Theme',
      defaultValue: 'light',
      allowedValues: ['light', 'dark', 'auto'],
    },
    {
      description: 'Defines the heading used in accordion.',
      type: 'string',
      defaultValue: null,
      allowedValues: 'string',
    },
    {
      description: 'Defines if accordion is open.',
      type: 'boolean',
      defaultValue: null,
      allowedValues: 'boolean',
    },
    {
      description: 'Defines which slide to be active (zero-based numbering).',
      type: 'number',
      defaultValue: 0,
      allowedValues: 'number',
    },
    {
      description: 'State of the banner.',
      type: 'BannerState',
      defaultValue: 'info',
      allowedValues: ['info', 'warning', 'error', 'neutral'],
      deprecatedValues: ['neutral'],
    },
    {
      description: 'Sets the initial value of the segmented-control.',
      type: 'string | number',
      defaultValue: null,
      allowedValues: ['string', 'number'],
    },
    {
      description: 'Has no effect anymore @deprecated since v3.0.0, will be removed with next major release',
      type: 'GridGutter',
      defaultValue: { base: 16, s: 24, m: 36 },
      isDeprecated: true,
      isBreakpointCustomizable: true,
      allowedValues: [16, 24, 36],
    },
    {
      description: 'The selected values.',
      type: 'string[]',
      defaultValue: [],
      isArray: true,
      allowedValues: 'string',
    },
    {
      description: 'Scrolls the scroll area to the left either smooth or immediately.',
      type: 'ScrollerScrollToPosition',
      defaultValue: null,
      allowedValues: { scrollPosition: 'number', isSmooth: 'boolean' },
    },
    {
      description: 'Override the default wordings that are used for aria-labels on the next/prev and page buttons.',
      type: 'PaginationInternationalization',
      defaultValue: { root: 'Pagination', prev: 'Previous page', next: 'Next page', page: 'Page' },
      allowedValues: { root: 'string', prev: 'string', next: 'string', page: 'string' },
    },
    {
      description: 'Add ARIA attributes.',
      type: 'SpinnerAriaAttribute',
      defaultValue: null,
      isAria: true,
      allowedValues: { 'aria-label': 'string' },
    },
    {
      description: 'Add ARIA attributes.',
      type: 'WordmarkAriaAttribute',
      defaultValue: null,
      isAria: true,
      allowedValues: { 'aria-label': 'string', 'aria-current': 'string' },
    },
  ])('should return correctly formatted string for: %j', (meta) => {
    expect(formatPropType(meta)).toMatchSnapshot();
  });
});

describe('formatPropDefaultValue()', () => {
  it.each<PropMeta>([
    {
      description: 'The text size.',
      type: 'AccordionSize',
      defaultValue: 'small',
      isBreakpointCustomizable: true,
      allowedValues: ['small', 'medium'],
    },
    {
      description:
        '@deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead. Defines if the banner can be closed/removed by the user.',
      type: 'boolean',
      defaultValue: null,
      isDeprecated: true,
      allowedValues: 'boolean',
    },
    {
      description:
        "Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'.   // prettier-ignore",
      type: 'LinkTileModelSignatureLinkDirection',
      defaultValue: { base: 'column', xs: 'row' },
      isBreakpointCustomizable: true,
      allowedValues: ['row', 'column'],
    },
    {
      description: 'A Boolean attribute indicating that a like button should be shown.',
      type: 'boolean',
      defaultValue: true,
      allowedValues: 'boolean',
    },
    {
      description: 'If true the modal uses max viewport height and width. Should only be used for mobile.',
      type: 'boolean',
      defaultValue: false,
      isBreakpointCustomizable: true,
      allowedValues: 'boolean',
    },
    {
      description: 'Adapts the model of the component.',
      type: 'ModelSignatureModel',
      defaultValue: '911',
      allowedValues: ['718', '911', 'boxster', 'cayenne', 'cayman', 'macan', 'panamera', 'taycan', 'turbo-s', 'turbo'],
    },
    {
      description: 'The selected values.',
      type: 'string[]',
      defaultValue: [],
      isArray: true,
      allowedValues: 'string',
    },
    {
      description: 'The total count of items.',
      type: 'number',
      defaultValue: 1,
      isRequired: true,
      allowedValues: 'number',
    },
  ])('should return correctly formatted string for: %j', (meta) => {
    expect(formatPropDefaultValue(meta)).toMatchSnapshot();
  });
});

describe('formatEventType()', () => {
  it.each<EventMeta>([
    {
      description:
        "@deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when carousel's content slides.",
      type: 'CarouselUpdateEventDetail',
      typeDetail: '{ activeIndex: number; previousIndex: number }',
      isDeprecated: true,
    },
    {
      description: "Emitted when carousel's content slides.",
      type: 'CarouselUpdateEventDetail',
      typeDetail: '{ activeIndex: number; previousIndex: number }',
    },
    { description: 'Emitted when the component requests to be dismissed.', type: 'void' },
    {
      description: 'Emitted when the like button is clicked.',
      type: 'LinkTileProductLikeEventDetail',
      typeDetail: '{ liked: boolean }',
    },
    {
      description:
        '@deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when sorting is changed.',
      type: 'TableUpdateEventDetail',
      typeDetail: '{ id: string; active?: boolean; direction?: Direction }',
      isDeprecated: true,
    },
  ])('should return correctly formatted string for: %j', (meta) => {
    expect(formatEventType(meta)).toMatchSnapshot();
  });
});
