import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import { getComponentCss } from './ai-tag-styles';
import {
  AI_TAG_TRANSLATIONS,
  AI_TAG_VARIANTS,
  type AiTagLocale,
  type AiTagVariant,
  getAiTagTranslation,
} from './ai-tag-utils';

const propTypes: PropTypes<typeof AiTag> = {
  locale: AllowedTypes.oneOf<AiTagLocale>(Object.keys(AI_TAG_TRANSLATIONS) as AiTagLocale[]),
  variant: AllowedTypes.oneOf<AiTagVariant>(AI_TAG_VARIANTS),
};

@Component({
  tag: 'p-ai-tag',
  shadow: true,
})
export class AiTag {
  @Element() public host!: HTMLElement;

  /** Locale for the AI text (ISO format, e.g. "de_DE"). */
  @Prop() public locale?: AiTagLocale = 'en_US';

  /** Variant to display: 'abbreviation' (e.g. "AI"), 'generated' (e.g. "AI-generated"), or 'modified' (e.g. "AI-modified"). */
  @Prop() public variant?: AiTagVariant = 'generated';

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(this.host, getComponentCss);

    const { short, long, generated, modified } = getAiTagTranslation(this.locale);

    return (
      <div>
        {this.variant !== 'abbreviation' ? (
          this.variant === 'modified' ? (
            modified
          ) : (
            generated
          )
        ) : (
          <abbr title={long}>{short}</abbr>
        )}
      </div>
    );
  }
}
