import Protocol from 'devtools-protocol';
import { CDPSession, Page } from 'puppeteer';
import NodeId = Protocol.DOM.NodeId;
import BackendNodeId = Protocol.DOM.BackendNodeId;

export const CSS_ANIMATION_DURATION = 1000;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = typeof FORCED_PSEUDO_CLASSES[number];

export const HOVERED_STATE: ForcedPseudoClasses[] = ['hover'];
export const FOCUSED_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
export const FOCUSED_HOVERED_STATE = HOVERED_STATE.concat(FOCUSED_STATE);

export const generateGUID = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const forceStateOnElements = async (page: Page, selectors: string[]): Promise<void> => {
  for (const selector of selectors) {
    const cdp = await page.target().createCDPSession(); // each selector needs their own cdp session, otherwise forcedPseudoStates are not persisted
    const { hostElementSelector, shadowRootNodeName } = resolveSelector(selector);
    const hostNodeIds: NodeId[] = await getHostElementNodeIds(cdp, hostElementSelector);

    for (const hostNodeId of hostNodeIds) {
      await forceStateOnNodeId(
        cdp,
        shadowRootNodeName ? await getElementNodeIdInShadowRoot(cdp, hostNodeId, shadowRootNodeName) : hostNodeId,
        getStates(selector)
      );
    }
  }
};

const resolveSelector = (selector: string): { hostElementSelector: string; shadowRootNodeName: string } => {
  const selectorParts = selector.split('>>>');
  return { hostElementSelector: selectorParts[0].trim(), shadowRootNodeName: selectorParts[1]?.trim() };
};

const getHostElementNodeIds = async (cdp: CDPSession, selector: string): Promise<NodeId[]> => {
  await cdp.send('DOM.getDocument');
  const { root } = (await cdp.send('DOM.getDocument', {
    depth: -1,
    pierce: true,
  })) as Protocol.DOM.GetDocumentResponse;

  return (
    (await cdp.send('DOM.querySelectorAll', {
      nodeId: root.nodeId,
      selector,
    })) as Protocol.DOM.QuerySelectorAllResponse
  ).nodeIds;
};

export const findBackendNodeId = (currentNode: Protocol.DOM.Node, localNodeName: string): BackendNodeId => {
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

const getElementNodeIdInShadowRoot = async (cdp: CDPSession, nodeId: NodeId, selector: string): Promise<NodeId> => {
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
  nodeId: NodeId,
  forcedPseudoClasses: ForcedPseudoClasses[]
): Promise<void> => {
  await cdp.send('CSS.enable');
  await cdp.send('CSS.forcePseudoState', {
    nodeId,
    forcedPseudoClasses,
  });
};

const getStates = (selector: string): ForcedPseudoClasses[] => {
  if (selector.includes('hovered') && selector.includes('focused')) {
    return FOCUSED_HOVERED_STATE;
  } else if (selector.includes('hovered')) {
    return HOVERED_STATE;
  } else if (selector.includes('focused')) {
    return FOCUSED_STATE;
  }
};
