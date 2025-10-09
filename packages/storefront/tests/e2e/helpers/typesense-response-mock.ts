/** biome-ignore-all lint/correctness/noPrecisionLoss: <explanation> */
export const TYPESENSE_RESPONSE_MOCK = {
  results: [
    {
      facet_counts: [],
      found: 372,
      hits: [
        {
          document: {
            category: 'Components',
            content: 'SlotDescriptionisRequiredaltPropallowedTagNames<slot> Default slot for the button label.',
            id: 'a5ca618a9eb84b3c26e87d70b345d35b7ed6a6934d5ab468c85a461b17ffcf53',
            name: 'Slots',
            page: 'Button ',
            section: 'Slots',
            tab: 'API',
            url: '/components/button/api#slots',
          },
          highlight: {
            content: {
              matched_tokens: ['button'],
              snippet:
                'SlotDescriptionisRequiredaltPropallowedTagNames<slot> Default slot for the <mark>button</mark> label.',
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
            {
              field: 'content',
              matched_tokens: ['button'],
              snippet:
                'SlotDescriptionisRequiredaltPropallowedTagNames<slot> Default slot for the <mark>button</mark> label.',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              "type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; xxl?: T; }; PropertyAttributeDescriptionTypeDefaultaria ariaAdd ARIA attributes.type ButtonAriaAttribute = { 'aria-label'?: string; 'aria-description'?: string; 'aria-expanded'?: string; 'aria-pressed'?: string; 'aria-haspopup'?: string;}undefinedcompact 🛠compactDisplays as compact version.boolean BreakpointCustomizable<boolean>falsedisabled disabledDisables the button. No events will be triggered while disabled state is active.booleanfalseform formThe id of a form element the button should be associated with.stringundefinedhideLabel 🛠hide-labelShow or hide label. For better accessibility it is recommended to show the label.boolean BreakpointCustomizable<boolean>falseicon iconThe icon shown. By choosing 'none', no icon is displayed.type ButtonIcon = '360' '4-wheel-drive' 'accessibility' 'active-cabin-ventilation' 'add' 'adjust' 'aggregation' 'ai-3d-object' 'ai-code' 'ai-edit' 'ai-image' 'ai-scale' 'ai-sound' 'ai-spark' 'ai-spark-filled' 'ai-text' 'ai-video' 'arrow-compact-down' 'arrow-compact-left' 'arrow-compact-right' 'arrow-compact-up' 'arrow-double-down' 'arrow-double-left' 'arrow-double-right' 'arrow-double-up' 'arrow-down' 'arrow-first' 'arrow-head-down' 'arrow-head-left' 'arrow-head-right' 'arrow-head-up' 'arrow-last' 'arrow-left' 'arrow-right' 'arrow-up' 'arrows' 'attachment' 'augmented-reality' 'battery-empty' 'battery-empty-co2' 'battery-empty-fuel' 'battery-full' 'battery-half' 'battery-one-quarter' 'battery-three-quarters' 'bell' 'bookmark' 'bookmark-filled' 'brain' 'broadcast' 'cabriolet' 'calculator' 'calendar' 'camera' 'car' 'car-battery' 'card' 'charging-active' 'charging-network' 'charging-state' 'charging-station' 'chart' 'chat' 'check' 'city' 'climate' 'climate-control' 'clock' 'close' 'closed-caption' 'cloud' 'co2-class' 'co2-emission' 'color-picker' 'compare' 'compass' 'configurate' 'copy' 'country-road' 'coupe' 'cubic-capacity' 'cut' 'delete' 'disable' 'dislike' 'dislike-filled' 'document' 'door' 'download' 'drag' 'duration' 'ear' 'edit' 'email' 'error' 'error-filled' 'exclamation' 'exclamation-filled' 'external' 'fast-backward' 'fast-forward' 'file-csv' 'file-excel' 'filter' 'fingerprint' 'flag' 'flash' 'fuel-station' 'garage' 'genuine-parts' 'geo-localization' 'gift' 'globe' 'grid' 'grip' 'group' 'hand' 'heart' 'heart-filled' 'highway' 'highway-filled' 'history' 'home' 'horn' 'image' 'increase' 'information' 'information-filled' 'key' 'laptop' 'leaf' 'leather' 'light' 'like' 'like-filled' 'limousine' 'linked' 'list' 'locate' 'lock' 'lock-open' 'logo-apple-carplay' 'logo-apple-music' 'logo-apple-podcast' 'logo-baidu' 'logo-delicious' 'logo-digg' 'logo-facebook' 'logo-foursquare' 'logo-gmail' 'logo-google' 'logo-hatena' 'logo-instagram' 'logo-kaixin' 'logo-kakaotalk' 'logo-kununu' 'logo-linkedin' 'logo-naver' 'logo-pinterest' 'logo-qq' 'logo-qq-share' 'logo-reddit' 'logo-skyrock' 'logo-snapchat' 'logo-sohu' 'logo-spotify' 'logo-tecent' 'logo-telegram' 'logo-tiktok' 'logo-tumblr' 'logo-twitter' 'logo-viber' 'logo-vk' 'logo-wechat' 'logo-weibo' 'logo-whatsapp' 'logo-x' 'logo-xing' 'logo-yahoo' 'logo-youku' 'logo-youtube' 'logout' 'map' 'menu-dots-horizontal' 'menu-dots-vertical' 'menu-lines' 'microphone' 'minus' 'mobile' 'moon' 'new-chat' 'news' 'none' 'north-arrow' 'oil-can' 'online-search' 'parking-brake' 'parking-light' 'paste' 'pause' 'phone' 'pin' 'pin-filled' 'pivot' 'play' 'plug' 'plus' 'preheating' 'price-tag' 'printer' 'purchase' 'push-pin' 'push-pin-off' 'qr' 'qr-off' 'question' 'question-filled' 'racing-flag' 'radar' 'radio' 'refresh' 'replay' 'reset' 'return' 'road' 'roof-closed' 'roof-open' 'route' 'rss' 'save' 'screen' 'search' 'seat' 'send' 'service-technician' 'share' 'shopping-bag' 'shopping-bag-filled' 'shopping-cart' 'shopping-cart-filled' 'sidebar' 'sidelights' 'skip-backward' 'skip-forward' 'snowflake' 'sort' 'stack' 'star' 'star-filled' 'steering-wheel' 'stop' 'stopwatch' 'subtract' 'success' 'success-filled' 'sun' 'suv' 'switch' 'tablet' 'tachometer' 'theme' 'tire' 'trigger-finger' 'truck' 'turismo' 'unlinked' 'upload' 'user' 'user-filled' 'user-group' 'user-manual' 'video' 'view' 'view-off' 'volume-off' 'volume-up' 'warning' 'warning-filled' 'weather' 'weight' 'wifi' 'work' 'wrench' 'wrenches' 'zoom-in' 'zoom-out''none'iconSource icon-sourceA URL path to a custom icon.stringundefinedloading loadingDisables the button and shows a loading indicator. No events will be triggered while loading state is active.booleanfalsename nameThe name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form.stringundefinedtheme themeAdapts the button color depending on the theme.type Theme = 'light' 'dark' 'auto''light'type typeSpecifies the type of the button.type ButtonType = 'button' 'submit' 'reset''submit'value valueDefines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button.stringundefinedvariant variantThe style variant of the button.type ButtonVariant = 'primary' 'secondary' 'ghost' 'tertiary' 🚫'primary'",
            id: 'd6399d05ad273f1fbd3dfcdb0c35197236e19ad959d8587daddc6fd3215e566f',
            name: 'Properties',
            page: 'Button ',
            section: 'Properties',
            tab: 'API',
            url: '/components/button/api#properties',
          },
          highlight: {
            content: {
              matched_tokens: ['Button', 'button', 'button'],
              snippet:
                "type of the button.type <mark>Button</mark>Type = '<mark>button</mark>' 'submit' 'reset''submit'value valueDefines the value associated with the <mark>button</mark>'s name when it's submitted",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['Button', 'button', 'button'],
              snippet:
                "type of the button.type <mark>Button</mark>Type = '<mark>button</mark>' 'submit' 'reset''submit'value valueDefines the value associated with the <mark>button</mark>'s name when it's submitted",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              "Button Table of Contents PropsSlots Properties type BreakpointCustomizable<T> = { base: T; xs?: T; s?: T; m?: T; l?: T; xl?: T; xxl?: T; }; PropertyAttributeDescriptionTypeDefaultaria ariaAdd ARIA attributes.type ButtonAriaAttribute = { 'aria-label'?: string; 'aria-description'?: string; 'aria-expanded'?: string; 'aria-pressed'?: string; 'aria-haspopup'?: string;}undefinedcompact 🛠compactDisplays as compact version.boolean BreakpointCustomizable<boolean>falsedisabled disabledDisables the button. No events will be triggered while disabled state is active.booleanfalseform formThe id of a form element the button should be associated with.stringundefinedhideLabel 🛠hide-labelShow or hide label. For better accessibility it is recommended to show the label.boolean BreakpointCustomizable<boolean>falseicon iconThe icon shown. By choosing 'none', no icon is displayed.type ButtonIcon = '360' '4-wheel-drive' 'accessibility' 'active-cabin-ventilation' 'add' 'adjust' 'aggregation' 'ai-3d-object' 'ai-code' 'ai-edit' 'ai-image' 'ai-scale' 'ai-sound' 'ai-spark' 'ai-spark-filled' 'ai-text' 'ai-video' 'arrow-compact-down' 'arrow-compact-left' 'arrow-compact-right' 'arrow-compact-up' 'arrow-double-down' 'arrow-double-left' 'arrow-double-right' 'arrow-double-up' 'arrow-down' 'arrow-first' 'arrow-head-down' 'arrow-head-left' 'arrow-head-right' 'arrow-head-up' 'arrow-last' 'arrow-left' 'arrow-right' 'arrow-up' 'arrows' 'attachment' 'augmented-reality' 'battery-empty' 'battery-empty-co2' 'battery-empty-fuel' 'battery-full' 'battery-half' 'battery-one-quarter' 'battery-three-quarters' 'bell' 'bookmark' 'bookmark-filled' 'brain' 'broadcast' 'cabriolet' 'calculator' 'calendar' 'camera' 'car' 'car-battery' 'card' 'charging-active' 'charging-network' 'charging-state' 'charging-station' 'chart' 'chat' 'check' 'city' 'climate' 'climate-control' 'clock' 'close' 'closed-caption' 'cloud' 'co2-class' 'co2-emission' 'color-picker' 'compare' 'compass' 'configurate' 'copy' 'country-road' 'coupe' 'cubic-capacity' 'cut' 'delete' 'disable' 'dislike' 'dislike-filled' 'document' 'door' 'download' 'drag' 'duration' 'ear' 'edit' 'email' 'error' 'error-filled' 'exclamation' 'exclamation-filled' 'external' 'fast-backward' 'fast-forward' 'file-csv' 'file-excel' 'filter' 'fingerprint' 'flag' 'flash' 'fuel-station' 'garage' 'genuine-parts' 'geo-localization' 'gift' 'globe' 'grid' 'grip' 'group' 'hand' 'heart' 'heart-filled' 'highway' 'highway-filled' 'history' 'home' 'horn' 'image' 'increase' 'information' 'information-filled' 'key' 'laptop' 'leaf' 'leather' 'light' 'like' 'like-filled' 'limousine' 'linked' 'list' 'locate' 'lock' 'lock-open' 'logo-apple-carplay' 'logo-apple-music' 'logo-apple-podcast' 'logo-baidu' 'logo-delicious' 'logo-digg' 'logo-facebook' 'logo-foursquare' 'logo-gmail' 'logo-google' 'logo-hatena' 'logo-instagram' 'logo-kaixin' 'logo-kakaotalk' 'logo-kununu' 'logo-linkedin' 'logo-naver' 'logo-pinterest' 'logo-qq' 'logo-qq-share' 'logo-reddit' 'logo-skyrock' 'logo-snapchat' 'logo-sohu' 'logo-spotify' 'logo-tecent' 'logo-telegram' 'logo-tiktok' 'logo-tumblr' 'logo-twitter' 'logo-viber' 'logo-vk' 'logo-wechat' 'logo-weibo' 'logo-whatsapp' 'logo-x' 'logo-xing' 'logo-yahoo' 'logo-youku' 'logo-youtube' 'logout' 'map' 'menu-dots-horizontal' 'menu-dots-vertical' 'menu-lines' 'microphone' 'minus' 'mobile' 'moon' 'new-chat' 'news' 'none' 'north-arrow' 'oil-can' 'online-search' 'parking-brake' 'parking-light' 'paste' 'pause' 'phone' 'pin' 'pin-filled' 'pivot' 'play' 'plug' 'plus' 'preheating' 'price-tag' 'printer' 'purchase' 'push-pin' 'push-pin-off' 'qr' 'qr-off' 'question' 'question-filled' 'racing-flag' 'radar' 'radio' 'refresh' 'replay' 'reset' 'return' 'road' 'roof-closed' 'roof-open' 'route' 'rss' 'save' 'screen' 'search' 'seat' 'send' 'service-technician' 'share' 'shopping-bag' 'shopping-bag-filled' 'shopping-cart' 'shopping-cart-filled' 'sidebar' 'sidelights' 'skip-backward' 'skip-forward' 'snowflake' 'sort' 'stack' 'star' 'star-filled' 'steering-wheel' 'stop' 'stopwatch' 'subtract' 'success' 'success-filled' 'sun' 'suv' 'switch' 'tablet' 'tachometer' 'theme' 'tire' 'trigger-finger' 'truck' 'turismo' 'unlinked' 'upload' 'user' 'user-filled' 'user-group' 'user-manual' 'video' 'view' 'view-off' 'volume-off' 'volume-up' 'warning' 'warning-filled' 'weather' 'weight' 'wifi' 'work' 'wrench' 'wrenches' 'zoom-in' 'zoom-out''none'iconSource icon-sourceA URL path to a custom icon.stringundefinedloading loadingDisables the button and shows a loading indicator. No events will be triggered while loading state is active.booleanfalsename nameThe name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form.stringundefinedtheme themeAdapts the button color depending on the theme.type Theme = 'light' 'dark' 'auto''light'type typeSpecifies the type of the button.type ButtonType = 'button' 'submit' 'reset''submit'value valueDefines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button.stringundefinedvariant variantThe style variant of the button.type ButtonVariant = 'primary' 'secondary' 'ghost' 'tertiary' 🚫'primary' Slots SlotDescriptionisRequiredaltPropallowedTagNames<slot> Default slot for the button label. ",
            id: '4b950c09e6f7e05ce5c153148dc51879325560fae8d8b2f3d4cd52661fe82f23',
            name: 'API',
            page: 'Button ',
            tab: 'API',
            url: '/components/button/api',
          },
          highlight: {
            content: {
              matched_tokens: ['Button', 'button', 'button'],
              snippet:
                "type of the button.type <mark>Button</mark>Type = '<mark>button</mark>' 'submit' 'reset''submit'value valueDefines the value associated with the <mark>button</mark>'s name when it's submitted",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['Button', 'button', 'button'],
              snippet:
                "type of the button.type <mark>Button</mark>Type = '<mark>button</mark>' 'submit' 'reset''submit'value valueDefines the value associated with the <mark>button</mark>'s name when it's submitted",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              'Labelling If the text of a button does not clearly indicate what the button\'s behavior is, add a brief, descriptive label using the aria property with the aria-label value to provide more context for e.g. screen reader users. Phrases like "Add", "Detail" or "Show" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Add item XYZ to shopping cart" or "Details of product XYZ."',
            id: 'e254bbbf40fd88723de8ce468bbbc20e037ec838c5393b35d8701b1cd34a6d59',
            name: 'Development considerations',
            page: 'Button ',
            section: 'Development considerations',
            tab: 'Accessibility',
            url: '/components/button/accessibility#development-considerations',
          },
          highlight: {
            content: {
              matched_tokens: ['button', 'button'],
              snippet:
                "the text of a <mark>button</mark> does not clearly indicate what the <mark>button</mark>'s behavior is, add a",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['button', 'button'],
              snippet:
                "the text of a <mark>button</mark> does not clearly indicate what the <mark>button</mark>'s behavior is, add a",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              'Keyboard Key / stateFunctionTab, Shift-TabMoves focus to the next (or previous) focusable element.Enter, SpaceActivates the button.disabledButton still focusable. ARIA enhancements External ARIA provided by the aria property: ARIAUsagearia-labelDefines a string value that labels the interactive element.aria-descriptionDefines a string value that adds a more detailed description of the interactive element.aria-expandedExposes a visual state (e.g. expanded/collapsed) of another element.aria-pressedExposes the pressed state of a toggle button.aria-haspopupDefines that the button opens a popup (e.g. dialog). It can be used in combination with aria-expanded to indicate the state of the popup. Internal ARIA that is managed by the component: ARIAUsagearia-disabled="true"When disabled prop is set, this ARIA attribute is set on the button element.role="status"When loading prop is set, the component announces the loading state (start and finish).aria-hidden="true"When the icon prop is set, the icon is hidden from the screen reader.',
            id: '6cd49b39e594508361618e543655b3025f6972f7426d565e6c468aa3df50b8ff',
            name: 'Accessibility support',
            page: 'Button ',
            section: 'Accessibility support',
            tab: 'Accessibility',
            url: '/components/button/accessibility#accessibility-support',
          },
          highlight: {
            content: {
              matched_tokens: ['button'],
              snippet:
                'focusable element.Enter, SpaceActivates the <mark>button</mark>.disabledButton still focusable. ARIA enhancements',
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['button'],
              snippet:
                'focusable element.Enter, SpaceActivates the <mark>button</mark>.disabledButton still focusable. ARIA enhancements',
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              'Button Table of Contents Accessibility supportLimitationsDevelopment considerationsTests Accessibility support# Keyboard Key / stateFunctionTab, Shift-TabMoves focus to the next (or previous) focusable element.Enter, SpaceActivates the button.disabledButton still focusable. ARIA enhancements External ARIA provided by the aria property: ARIAUsagearia-labelDefines a string value that labels the interactive element.aria-descriptionDefines a string value that adds a more detailed description of the interactive element.aria-expandedExposes a visual state (e.g. expanded/collapsed) of another element.aria-pressedExposes the pressed state of a toggle button.aria-haspopupDefines that the button opens a popup (e.g. dialog). It can be used in combination with aria-expanded to indicate the state of the popup. Internal ARIA that is managed by the component: ARIAUsagearia-disabled="true"When disabled prop is set, this ARIA attribute is set on the button element.role="status"When loading prop is set, the component announces the loading state (start and finish).aria-hidden="true"When the icon prop is set, the icon is hidden from the screen reader. Limitations# Due to the nature of Web Components and shadowDOM, there are limitations in the usage of some ARIA attributes if they try to set relationship between elements in different shadowDOM\'s or shadowDOM/lightDOM combinations. ARIASupportaria-labelledby🚫aria-describedby🚫aria-owns🚫aria-controls🚫aria-activedescendant🚫 Development considerations# Labelling If the text of a button does not clearly indicate what the button\'s behavior is, add a brief, descriptive label using the aria property with the aria-label value to provide more context for e.g. screen reader users. Phrases like "Add", "Detail" or "Show" can be unclear when read out of context by a screen reader. In such instances, provide an alternative text that offers more detailed information, such as "Add item XYZ to shopping cart" or "Details of product XYZ." Tests# Automated TechnologySupportAXE-Core (WCAG 2.2 AA, Best-Practice)✅High-Contrast Mode (light/dark)🟠(Currently no outline visible in variant "ghost".)Text-Zoom (200%)✅ Manual TechnologySupportKeyboard✅Screen reader (VoiceOver, NVDA)✅ ',
            id: '90da05bfe8db8d967d7a42a7ad4dee03134400e11a4a8c15022c6870be030a41',
            name: 'Accessibility',
            page: 'Button ',
            tab: 'Accessibility',
            url: '/components/button/accessibility',
          },
          highlight: {
            content: {
              matched_tokens: ['button', 'button'],
              snippet:
                "the text of a <mark>button</mark> does not clearly indicate what the <mark>button</mark>'s behavior is, add a",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['button', 'button'],
              snippet:
                "the text of a <mark>button</mark> does not clearly indicate what the <mark>button</mark>'s behavior is, add a",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content: 'Button Group Links',
            id: 'd8f26650c25b14322560acb4a3ccf241d591ffe5fc9ad8eaaec489abe72370ed',
            name: 'Related components',
            page: 'Button ',
            section: 'Related components',
            tab: 'Usage',
            url: '/components/button/usage#related-components',
          },
          highlight: {
            content: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> Group Links',
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
            {
              field: 'content',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> Group Links',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              "The following segment provides instructions for designers and developers regarding the appropriate utilization of this component in various situations. Do: Use buttons for actions that have clear consequences, such as submitting a form or initiating a purchase. Use buttons to indicate the next step in a process, such as \"Continue\" or \"Next\". Use buttons with clear and concise labels that accurately describe the action they perform. Use the primary button for the most important or desired action, and use the secondary button for less important or secondary actions. Use icons in buttons to enhance their meaning, but ensure the icon is relevant and easily recognizable. Use disabled buttons to indicate actions that are currently unavailable or incomplete, and provide context for why the button is disabled. Don't: Don't use buttons for non-actionable elements, such as decorative graphics or text. Don't use ambiguous or unclear labels for buttons, as it can lead to confusion for users. Don't use too many buttons on a page or in a single section, as it can overwhelm users and reduce usability. Don't use primary and secondary buttons interchangeably, as it can confuse users and reduce the clarity of your interface. Don't use disabled buttons without providing context for why the button is disabled. This can lead to confusion and frustration for users. ",
            id: 'f5ef5bae524e7bfa41a4e1e20dd8cd4b8cb71ebdd0d55ee1b6075fce03c2b8e3',
            name: 'Usage',
            page: 'Button ',
            section: 'Usage',
            tab: 'Usage',
            url: '/components/button/usage#usage',
          },
          highlight: {
            content: {
              matched_tokens: ['button', 'button'],
              snippet:
                "context for why the <mark>button</mark> is disabled. Don't: Don't use <mark>button</mark>s for non-actionable elements, such",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['button', 'button'],
              snippet:
                "context for why the <mark>button</mark> is disabled. Don't: Don't use <mark>button</mark>s for non-actionable elements, such",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              "Button Table of Contents UsageRelated components Usage# The following segment provides instructions for designers and developers regarding the appropriate utilization of this component in various situations. Do: Use buttons for actions that have clear consequences, such as submitting a form or initiating a purchase. Use buttons to indicate the next step in a process, such as \"Continue\" or \"Next\". Use buttons with clear and concise labels that accurately describe the action they perform. Use the primary button for the most important or desired action, and use the secondary button for less important or secondary actions. Use icons in buttons to enhance their meaning, but ensure the icon is relevant and easily recognizable. Use disabled buttons to indicate actions that are currently unavailable or incomplete, and provide context for why the button is disabled. Don't: Don't use buttons for non-actionable elements, such as decorative graphics or text. Don't use ambiguous or unclear labels for buttons, as it can lead to confusion for users. Don't use too many buttons on a page or in a single section, as it can overwhelm users and reduce usability. Don't use primary and secondary buttons interchangeably, as it can confuse users and reduce the clarity of your interface. Don't use disabled buttons without providing context for why the button is disabled. This can lead to confusion and frustration for users. Related components# Button Group Links ",
            id: 'f149b84aa86c1cce7b84f3ab837c199c0511a6ab71dad0baecaa6cfc8e8c3910',
            name: 'Usage',
            page: 'Button ',
            tab: 'Usage',
            url: '/components/button/usage',
          },
          highlight: {
            content: {
              matched_tokens: ['button', 'button'],
              snippet:
                "context for why the <mark>button</mark> is disabled. Don't: Don't use <mark>button</mark>s for non-actionable elements, such",
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'content',
              matched_tokens: ['button', 'button'],
              snippet:
                "context for why the <mark>button</mark> is disabled. Don't: Don't use <mark>button</mark>s for non-actionable elements, such",
            },
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
        {
          document: {
            category: 'Components',
            content:
              'When a button is used as a submit or reset button outside a form, the form attribute can be utilized to explicitly associate the button with a specific form element. When using the p-button component as a submit or reset button outside a form, it relies on the ElementInternals API, which has limited browser support. As of now, the submitter in the form event is null because the button cannot be accessed within the shadow DOM to be passed as an argument to the requestSubmit() function ( WICG/webcomponents#814).Additionally, custom components using ElementInternals may include all values of elements with the same name attribute in form data, rather than only the value of the triggering element, deviating from native form behavior. SubmitResetLast submitted data: noneVanilla JSAngularReactVueOpen in Stackblitz<!doctype html> <html lang="en" class="auto"> <head> <title></title> </head> <body class="bg-base"> <form id="some-form"> <p-textarea name="some-name" label="Some Label"></p-textarea> </form> <p-button-group> <p-button type="submit" form="some-form">Submit</p-button> <p-button type="reset" form="some-form">Reset</p-button> </p-button-group> <p-text>Last submitted data: none</p-text> <script> const debugElement = document.querySelector(\'p-text\'); const form = document.querySelector(\'form\'); form.addEventListener(\'submit\', (e) => { e.preventDefault(); const formData = new FormData(form); debugElement.innerText = `Last submitted data: ${formData.get(\'some-name\') || \'none\'} `; }); </script> </body> </html>',
            id: 'd31fa8e0e33dd1ab5a76a53f13ad284c295865c647e7237c55e39983b717404c',
            name: 'Form Attribute',
            page: 'Button ',
            section: 'Form Attribute',
            tab: 'Examples',
            url: '/components/button/examples#form-attribute',
          },
          highlight: {
            content: {
              matched_tokens: ['button'],
              snippet: 'When a <mark>button</mark> is used as a',
            },
            page: {
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
          },
          highlights: [
            {
              field: 'page',
              matched_tokens: ['Button'],
              snippet: '<mark>Button</mark> ',
            },
            {
              field: 'content',
              matched_tokens: ['button'],
              snippet: 'When a <mark>button</mark> is used as a',
            },
          ],
          text_match: 578730123365711978,
          text_match_info: {
            best_field_score: '1108091339008',
            best_field_weight: 13,
            fields_matched: 2,
            num_tokens_dropped: 0,
            score: '578730123365711978',
            tokens_matched: 1,
            typo_prefix_score: 0,
          },
        },
      ],
      out_of: 1650,
      page: 1,
      request_params: {
        collection_name: 'localhost',
        first_q: 'button',
        per_page: 10,
        q: 'button',
      },
      search_cutoff: false,
      search_time_ms: 2,
    },
  ],
};
