import packageJson from '../../package.json' with { type: 'json' };

/**
 * The Porsche Design System release the generated skills describe. Taken from this package's own
 * pinned wrapper dependency, which syncpack keeps aligned with every other package in the monorepo,
 * so the generation stays independent of the storefront.
 */
export const localPorscheDesignSystemVersion = packageJson.devDependencies['@porsche-design-system/components-react'];
