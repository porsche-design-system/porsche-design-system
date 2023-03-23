import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import type { WordmarkSize, WordmarkTarget, WordmarkAriaAttribute } from './wordmark-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, THEMES } from '../../utils';
import { WORDMARK_ARIA_ATTRIBUTES, WORDMARK_SIZES } from './wordmark-utils';
import { validateProps } from '../../utils/validation/validateProps';
import { getComponentCss } from './wordmark-styles';

const propTypes: PropTypes<typeof Wordmark> = {
  size: AllowedTypes.oneOf<WordmarkSize>(WORDMARK_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<WordmarkAriaAttribute>(WORDMARK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-wordmark',
  shadow: { delegatesFocus: true },
})
export class Wordmark {
  @Element() public host!: HTMLElement;

  /** Adapts sizing of wordmark. */
  @Prop() public size?: WordmarkSize = 'small';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: WordmarkTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<WordmarkAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.theme);

    const image = (
      <img
        src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0MzgzIDMwMCIgdmlld0JveD0iMCAwIDQzODMgMzAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00OTIgMjIxYzQ4LjEgMCA3NC0yNS45IDc0LTc0di03M2MwLTQ4LjEtMjUuOS03NC03NC03NGgtNDkydjMwMGg2OHYtNzl6bTYtMTQzdjY1YzAgNy44LTQuMiAxMi0xMiAxMmgtNDE4di04OWg0MThjNy44IDAgMTIgNC4yIDEyIDEyem0yMjAgMjIyYy00OC4xIDAtNzQtMjUuOS03NC03NHYtMTUyYzAtNDguMSAyNS45LTc0IDc0LTc0aDQwN2M0OC4xIDAgNzQgMjUuOSA3NCA3NHYxNTJjMCA0OC4xLTI1LjkgNzQtNzQgNzR6bTQwMS02NmM3LjggMCAxMi00LjIgMTItMTJ2LTE0NGMwLTcuOC00LjItMTItMTItMTJoLTM5NWMtNy44IDAtMTIgNC4yLTEyIDEydjE0NGMwIDcuOCA0LjIgMTIgMTIgMTJ6bTY1Ny0zNmMzOS44NDQ0IDE2Ljc1NzQgNjcuODUyNyA1Ni4xIDY4IDEwMmgtNjhjMC01NC0yNS03OS03OS03OWgtMzUxdjc5aC02OHYtMzAwaDQ5MmM0OC4xIDAgNzQgMjUuOSA3NCA3NHY1MC4xNGMwIDQ2LjA2LTIzLjc1IDcxLjc2LTY4IDczLjg2em0tMTItNDNjNy44IDAgMTItNC4yIDEyLTEydi02NWMwLTcuOC00LjItMTItMTItMTJoLTQxOHY4OXptMTU1LTgxYzAtNDguMSAyNS45LTc0IDc0LTc0aDQ4MnY1NmgtNDc2Yy03LjggMC0xMiA0LjItMTIgMTJ2NDJjMCA3LjggNC4yIDEyIDEyIDEyaDQxMmM0OC4xIDAgNzQgMjUuOSA3NCA3NHYzMGMwIDQ4LjEtMjUuOSA3NC03NCA3NGgtNDgydi01Nmg0NzZjNy44IDAgMTItNC4yIDEyLTEydi00MmMwLTcuOC00LjItMTItMTItMTJoLTQxMmMtNDguMSAwLTc0LTI1LjktNzQtNzR6bTY0MyAwYzAtNDguMSAyNS45LTc0IDc0LTc0aDQ3MHY2NmgtNDY0Yy03LjggMC0xMiA0LjItMTIgMTJ2MTQ0YzAgNy44IDQuMiAxMiAxMiAxMmg0NjR2NjZoLTQ3MGMtNDguMSAwLTc0LTI1LjktNzQtNzR6bTExNTYtNzR2MzAwaC02OHYtMTE3aC0zOTd2MTE3aC02OHYtMzAwaDY4djExN2gzOTd2LTExN3ptMTQ4IDU2djY2aDUxN3Y1NmgtNTE3djY2aDUxN3Y1NmgtNTg1di0zMDBoNTg1djU2eiIvPjwvc3ZnPg=="
        height={36}
        alt="Porsche"
      />
    );

    return (
      <Host>
        {this.href === undefined ? (
          image
        ) : (
          <a href={this.href} target={this.target} {...parseAndGetAriaAttributes(this.aria)}>
            {image}
          </a>
        )}
      </Host>
    );
  }
}
