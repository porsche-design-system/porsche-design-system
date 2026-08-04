import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import { getComponentCss } from './ai-tag-styles';
import {
  AI_TAG_LOCALES_ACCEPTED,
  AI_TAG_VARIANTS,
  type AiTagLocale,
  type AiTagVariant,
  getAiTagTranslation,
} from './ai-tag-utils';

const propTypes: PropTypes<typeof AiTag> = {
  locale: AllowedTypes.oneOf<AiTagLocale>(AI_TAG_LOCALES_ACCEPTED),
  variant: AllowedTypes.oneOf<AiTagVariant>(AI_TAG_VARIANTS),
};

@Component({
  tag: 'p-ai-tag',
  shadow: true,
})
export class AiTag {
  @Element() public host!: HTMLElement;

  /**
   * Market locale for the AI text (BCP47 e.g. `en-US` or POSIX e.g. `en_US`).
   * Copy is resolved by language; unknown languages fall back to English. Language-only `en` is supported.
   */
  @Prop() public locale?: AiTagLocale = 'en-US';

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
