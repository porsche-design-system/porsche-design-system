import type { Protocol } from 'devtools-protocol';
import type { CDPSession, Page } from 'puppeteer';

type NodeId = Protocol.DOM.NodeId;
type BackendNodeId = Protocol.DOM.BackendNodeId;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = (typeof FORCED_PSEUDO_CLASSES)[number];

const HOVER_STATE: ForcedPseudoClasses[] = ['hover'];
const FOCUS_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
const FOCUS_HOVER_STATE = HOVER_STATE.concat(FOCUS_STATE);

export const forceHoverState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, HOVER_STATE);
};
export const forceFocusState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, FOCUS_STATE);
};
export const forceFocusHoverState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, FOCUS_HOVER_STATE);
};

const forceStateOnElements = async (page: Page, selector: string, states: ForcedPseudoClasses[]): Promise<void> => {
  const cdp = await page.target().createCDPSession(); // each selector needs their own cdp session, otherwise forcedPseudoStates are not persisted
  const { hostElementSelector, shadowRootNodeName, deepShadowRootNodeName } = resolveSelector(selector);
  const hostNodeIds: NodeId[] = await getHostElementNodeIds(cdp, hostElementSelector);

  for (const hostNodeId of hostNodeIds) {
    let nodeIds: NodeId[] = shadowRootNodeName
      ? await getElementNodeIdsInShadowRoot(cdp, hostNodeId, shadowRootNodeName)
      : [hostNodeId];

    if (nodeIds && deepShadowRootNodeName) {
      nodeIds = (
        await Promise.all(nodeIds.map((nodeId) => getElementNodeIdsInShadowRoot(cdp, nodeId, deepShadowRootNodeName)))
      ).flat();
    }

    // only execute if a valid nodeId was found
    if (nodeIds) {
      for (const nodeId of nodeIds) {
        await forceStateOnNodeId(cdp, nodeId, states);
      }
    }
  }
};
export const resolveSelector = (
  selector: string
): { hostElementSelector: string; shadowRootNodeName: string; deepShadowRootNodeName: string } => {
  const [hostElementSelector, shadowRootNodeName, deepShadowRootNodeName] = selector.split('>>>').map((x, index) => {
    if (index > 0) {
      return x.replace('.', '').trim();
    } else {
      return x.trim();
    }
  });

  return { hostElementSelector, shadowRootNodeName, deepShadowRootNodeName };
};

const getHostElementNodeIds = async (cdp: CDPSession, selector: string): Promise<NodeId[]> => {
  await cdp.send('DOM.getDocument');
  const { root } = await cdp.send('DOM.getDocument', {
    depth: 0,
  });

  return (
    await cdp.send('DOM.querySelectorAll', {
      nodeId: root.nodeId,
      selector,
    })
  ).nodeIds;
};

export const findBackendNodeIds = (
  currentNode: Protocol.DOM.Node,
  localNodeNameOrClassName: string
): BackendNodeId[] => {
  // support tag names & class names
  if (
    currentNode.localName === localNodeNameOrClassName ||
    currentNode.attributes?.includes(localNodeNameOrClassName)
  ) {
    return [currentNode.backendNodeId];
  } else if (currentNode.children) {
    return currentNode
      .children!.map((child) => findBackendNodeIds(child, localNodeNameOrClassName))
      .flat()
      .filter(Boolean);
  } else {
    return [];
  }
};

const getElementNodeIdsInShadowRoot = async (cdp: CDPSession, nodeId: NodeId, selector: string): Promise<NodeId[]> => {
  const hostNode = (
    await cdp.send('DOM.describeNode', {
      nodeId,
      depth: -1,
      pierce: true,
    })
  ).node;

  const backendNodeIds = hostNode.shadowRoots ? findBackendNodeIds(hostNode.shadowRoots[0], selector) : [];

  return backendNodeIds.length
    ? (
        await cdp.send('DOM.pushNodesByBackendIdsToFrontend', {
          backendNodeIds,
        })
      ).nodeIds
    : [];
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
