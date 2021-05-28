import Protocol from 'devtools-protocol';
import { CDPSession, Page } from 'puppeteer';

export const CSS_ANIMATION_DURATION = 1000;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = typeof FORCED_PSEUDO_CLASSES[number];

export const HOVERED_STATE: ForcedPseudoClasses[] = ['hover'];
export const FOCUSED_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
export const FOCUSED_HOVERED_STATE = HOVERED_STATE.concat(FOCUSED_STATE);
export const FORCEABLE_PSEUDO_CLASSES: ForcedPseudoClasses[][] = [HOVERED_STATE, FOCUSED_STATE, FOCUSED_HOVERED_STATE];

const CDP = (function () {
  let _instance: CDPSession;
  let _page: Page;

  async function createInstance(page: Page) {
    return await page.target().createCDPSession();
  }

  return {
    getInstance: async function (page: Page) {
      if (!_instance || _page !== page) {
        _instance = await createInstance(page);
      }
      _page = page;
      return _instance;
    },
  };
})();

export const forceStateOnElement = async (
  page: Page,
  selector: string,
  states: ForcedPseudoClasses[]
): Promise<void> => {
  // const cdp = await CDP.getInstance(page); // TODO: causes previous actions to get removed (multiple sessions per state?)
  const cdp = await page.target().createCDPSession();

  const { hostElementSelector, shadowRootNodeName } = resolveSelector(selector);

  const nodeId = await getHostElementNodeId(cdp, hostElementSelector);

  await forceStateOnNodeId(
    cdp,
    shadowRootNodeName ? await getElementNodeIdInShadowRoot(cdp, nodeId, shadowRootNodeName) : nodeId,
    states
  );
};

const resolveSelector = (selector: string): { hostElementSelector: string; shadowRootNodeName: string } => {
  const selectorParts = selector.split('>>>');
  return { hostElementSelector: selectorParts[0].trim(), shadowRootNodeName: selectorParts[1].trim() };
};

const getHostElementNodeId = async (cdp: CDPSession, selector: string): Promise<number> => {
  await cdp.send('DOM.getDocument');
  const { root } = (await cdp.send('DOM.getDocument', {
    depth: -1,
    pierce: true,
  })) as Protocol.DOM.GetDocumentResponse;

  return (
    (await cdp.send('DOM.querySelector', {
      nodeId: root.nodeId,
      selector,
    })) as Protocol.DOM.QuerySelectorResponse
  ).nodeId;
};

export const findBackendNodeId = (currentNode: Protocol.DOM.Node, localNodeName: string): number => {
  if (currentNode.localName === localNodeName) {
    return currentNode.backendNodeId;
  } else {
    for (let i = 0; i < currentNode.children?.length; i++) {
      const currentChild = currentNode.children[i];
      const result = findBackendNodeId(currentChild, localNodeName);
      if (result) {
        return result;
      }
    }
    return undefined;
  }
};

const getElementNodeIdInShadowRoot = async (cdp: CDPSession, nodeId: number, selector: string): Promise<number> => {
  const hostNode: Protocol.DOM.Node = (
    (await cdp.send('DOM.describeNode', {
      nodeId,
      depth: -1,
      pierce: true,
    })) as Protocol.DOM.DescribeNodeResponse
  ).node;

  const backendNodeId = findBackendNodeId(hostNode.shadowRoots[0], selector);

  return (
    (await cdp.send('DOM.pushNodesByBackendIdsToFrontend', {
      backendNodeIds: [backendNodeId],
    })) as Protocol.DOM.PushNodesByBackendIdsToFrontendResponse
  ).nodeIds[0];
};

const forceStateOnNodeId = async (
  cdp: CDPSession,
  nodeId: number,
  forcedPseudoClasses: ForcedPseudoClasses[]
): Promise<void> => {
  await cdp.send('CSS.enable');
  await cdp.send('CSS.forcePseudoState', {
    nodeId,
    forcedPseudoClasses,
  });
};
