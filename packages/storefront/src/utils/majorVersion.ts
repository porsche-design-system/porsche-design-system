import pkgJson from '../../package.json' with { type: 'json' };

export const majorVersion = parseInt(
  pkgJson.dependencies['@porsche-design-system/components-react'].replace(/^\^|^~/, ''),
  10
);

export const fullVersion = pkgJson.dependencies['@porsche-design-system/components-react'];
