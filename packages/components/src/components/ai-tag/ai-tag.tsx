import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../types';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../utils';
import { getComponentCss } from './ai-tag-styles';
import {
  AI_TAG_TEXT_VARIANTS,
  AI_TAG_TRANSLATIONS,
  type AiTagLocale,
  type AiTagTextVariant,
  getAiTagTranslation,
} from './ai-tag-utils';

const propTypes: PropTypes<typeof AiTag> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
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

  /** Locale for the AI text (ISO format, e.g. "de_DE"). */
  @Prop() public locale?: AiTagLocale = 'en_US';

  /** Text variant to display: 'abbreviation' (e.g. "AI"), 'generated' (e.g. "AI-generated"), or 'modified' (e.g. "AI-modified"). */
  @Prop() public textVariant?: AiTagTextVariant = 'generated';

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(this.host, getComponentCss, this.theme);

    const { short, long, generated, modified } = getAiTagTranslation(this.locale);

    return (
      <div class="root">
        <span class="icon"></span>
        {this.textVariant !== 'abbreviation' ? (
          <span>{this.textVariant === 'modified' ? modified : generated}</span>
        ) : (
          <abbr title={long}>{short}</abbr>
        )}
      </div>
    );
  }
}
