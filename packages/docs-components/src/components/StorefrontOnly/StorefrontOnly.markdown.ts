import { defineMarkdownComponent } from '../../renderer/define';
import type { StorefrontOnlyProps } from './StorefrontOnly';

/**
 * Nothing. Its children are not rendered, so they may contain components that are not registered for Markdown.
 */
export const StorefrontOnly = defineMarkdownComponent<StorefrontOnlyProps>('StorefrontOnly', () => []);
