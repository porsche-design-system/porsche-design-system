import pkgJson from '../../package.json' with { type: 'json' };

export const localPorscheDesignSystemVersion = pkgJson.dependencies['@porsche-design-system/components-react'];

export const localPorscheDesignSystemMajorVersion = parseInt(localPorscheDesignSystemVersion.replace(/^\^|^~/, ''), 10);
