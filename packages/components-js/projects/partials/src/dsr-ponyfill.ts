import { hydrateShadowRoots } from '@webcomponents/template-shadowroot';

// biome-ignore lint/suspicious/noPrototypeBuiltins: ok
if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
  hydrateShadowRoots(document.body);
}
