import { hydrateShadowRoots } from '@webcomponents/template-shadowroot';

if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
  hydrateShadowRoots(document.body);
}
