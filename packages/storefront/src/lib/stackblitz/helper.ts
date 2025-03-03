import type { Framework } from '@/models/framework';

export const isReleasedPds = (pdsVersion?: string): boolean => !!pdsVersion || isStableStorefrontRelease();

export const isStableStorefrontRelease = (): boolean => /^\/v\d+\//.test(location.pathname);

export const convertImportPaths = (markup: string, framework: Framework): string => {
  const relativeDirectory = framework === 'angular' ? '../../' : framework === 'vue' ? '../' : '';
  return markup.replace(
    new RegExp(`@porsche-design-system\\/components-${framework.replace(/^vanilla-/, '')}`, 'g'),
    `./${relativeDirectory}@porsche-design-system/components-${framework}`
  );
};

export type PorscheDesignSystemBundle = { [path: string]: string };
export type PorscheDesignSystemBundleMap = {
  js?: PorscheDesignSystemBundle;
  angular?: PorscheDesignSystemBundle;
  react?: PorscheDesignSystemBundle;
  vue?: PorscheDesignSystemBundle;
};

export const getPorscheDesignSystemBundle = async (
  framework: Exclude<Framework, 'next'>,
  pdsVersion?: string
): Promise<PorscheDesignSystemBundle> => {
  const jsBundle = await fetchPorscheDesignSystemBundle('js', pdsVersion);

  switch (framework) {
    case 'vanilla-js':
      return jsBundle;
    case 'angular':
      return {
        ...jsBundle,
        ...(await fetchPorscheDesignSystemBundle('angular', pdsVersion)),
      };
    case 'react':
      return {
        ...jsBundle,
        ...(await fetchPorscheDesignSystemBundle('react', pdsVersion)),
      };
    case 'vue':
      return {
        ...jsBundle,
        ...(await fetchPorscheDesignSystemBundle('vue', pdsVersion)),
      };
  }
};

const porscheDesignSystemBundleMap: PorscheDesignSystemBundleMap = {};

export const fetchPorscheDesignSystemBundle = async (
  framework: keyof PorscheDesignSystemBundleMap,
  pdsVersion?: string
): Promise<PorscheDesignSystemBundle> => {
  if (!pdsVersion && !isStableStorefrontRelease() && !porscheDesignSystemBundleMap[framework]) {
    // { cache: 'no-store' }: download a resource with cache busting, to bypass the cache completely.
    const response = await fetch(`porsche-design-system/components-${framework}.json`, { cache: 'no-store' });
    porscheDesignSystemBundleMap[framework] = (await response.json()) as PorscheDesignSystemBundle;
  }

  return porscheDesignSystemBundleMap[framework] || {};
};
