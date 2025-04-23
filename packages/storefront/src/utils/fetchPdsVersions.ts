export const fetchPdsVersions = async (filterStable: boolean = true): Promise<string[]> => {
  const response = await fetch('https://registry.npmjs.org/@porsche-design-system/components-js', {
    headers: {
      accept: 'application/vnd.npm.install-v1+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch versions: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let versions = Object.keys(data.versions);

  if (filterStable) {
    versions = versions.filter((version) => /^\d+\.\d+\.\d+$/.test(version));
  }

  return versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
};
