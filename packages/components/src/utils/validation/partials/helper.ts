export const getAllCoreRelatedChunkSiblings = (element: Element): Element[] => {
  let nextSibling = element.nextElementSibling as any;
  const coreRelatedChunkSiblings = [];

  while (nextSibling?.href && nextSibling.href.includes('porsche-design-system.')) {
    coreRelatedChunkSiblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling as any;
  }
  return coreRelatedChunkSiblings;
};

export const getChunkLinkElementsForVersion = (version) => {
  const coreChunkLinkElement = document.querySelector(
    `[href*=porsche-design-system.v${version}]`.replace(/\./g, '\\.')
  );

  if (coreChunkLinkElement) {
    return [coreChunkLinkElement, ...getAllCoreRelatedChunkSiblings(coreChunkLinkElement)];
  }
};

export const getPorscheDesignSystemPrefixes = (): string[] =>
  (document as any).porscheDesignSystem
    ? Object.values((document as any).porscheDesignSystem)
        .map((value) => (value as any).prefixes)
        .filter((prefix, idx, arr) => arr.indexOf(prefix) === idx)
        .flat()
    : [];
