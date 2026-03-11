import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../types';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../utils';
import { getComponentCss } from './ai-tag-styles';
import {
  AI_TAG_ICONS,
  AI_TAG_TEXT_VARIANTS,
  AI_TAG_TRANSLATIONS,
  type AiTagIcon,
  type AiTagLocale,
  type AiTagTextVariant,
  getAiTagText,
} from './ai-tag-utils';

const propTypes: PropTypes<typeof AiTag> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  icon: AllowedTypes.oneOf<AiTagIcon>(AI_TAG_ICONS),
  locale: AllowedTypes.oneOf<AiTagLocale>(Object.keys(AI_TAG_TRANSLATIONS) as AiTagLocale[]),
  textVariant: AllowedTypes.oneOf<AiTagTextVariant>(AI_TAG_TEXT_VARIANTS),
};

@Component({
  tag: 'p-ai-tag',
  shadow: true,
})
export class AiTag {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The AI icon shown. */
  @Prop() public icon?: AiTagIcon = 'ai-spark';

  /** Locale for the AI text (ISO format, e.g. "de_DE"). */
  @Prop() public locale?: AiTagLocale = 'en_US';

  /** Text variant to display: 'abbreviation' (e.g. "AI") or 'long-form' (e.g. "Artificial Intelligence"). */
  @Prop() public textVariant?: AiTagTextVariant = 'abbreviation';

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(this.host, getComponentCss, this.icon, this.theme);

    const text = getAiTagText(this.locale, this.textVariant);

    return (
      <span>
        <span class="icon" aria-hidden="true"></span>
        {text}
      </span>
    );
  }
}
