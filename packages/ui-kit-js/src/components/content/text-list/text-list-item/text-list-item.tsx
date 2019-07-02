import { JSX, Component, Host, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../../utils/prefix";

@Component({
  tag: "p-text-list-item",
  styleUrl: "text-list-item.scss"
})
export class TextListItem {
  render(): JSX.Element {
    const textListItemClasses = cx(prefix("text-list__item"));

    return (
      <Host role="listitem" class={textListItemClasses}>
        <slot />
      </Host>
    );
  }
}
