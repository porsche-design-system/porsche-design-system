import type { A11yIntegrationMarkup } from '@/models/a11yIntegrationExample';
import { generateVanillaJsMarkup } from '@/utils/generator/generateVanillaJsMarkup';

export const getA11yIntegrationMarkup = (markup: A11yIntegrationMarkup): string => {
  const { markup: generatedMarkup } = generateVanillaJsMarkup(markup.generator(markup.state ?? {}));
  return generatedMarkup?.trim() ?? '';
};
