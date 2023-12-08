import { type Protocol } from 'devtools-protocol';
import { type Page, type CDPSession } from '@playwright/test';

type NodeId = Protocol.DOM.NodeId;
type BackendNodeId = Protocol.DOM.BackendNodeId;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = (typeof FORCED_PSEUDO_CLASSES)[number];

const HOVER_STATE: ForcedPseudoClasses[] = ['hover'];
const FOCUS_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
const FOCUS_HOVER_STATE = HOVER_STATE.concat(FOCUS_STATE);

export const PSEUDO_STATES = ['hover', 'focus', 'focus-hover'] as const;

export const getPlaygroundPseudoStatesMarkup = (
  markup: () => string,
  opts?: { autoLayout?: 'inline' | 'block' }
): string => {
  const { autoLayout = false } = opts || {};

  return PSEUDO_STATES.map((state) => {
    return `<div class="playground light ${state} ${
      autoLayout === 'inline' ? 'auto-layout-inline' : autoLayout === 'block' ? 'auto-layout-block' : ''
    }" title="should render :${state}">${markup()}</div>`;
  }).join('\n');
};

export const generateGUID = (): string => {
  // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const forceHoverState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, HOVER_STATE);
};
export const forceFocusState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, FOCUS_STATE);
};
export const forceFocusHoverState = (page: Page, selector: string): Promise<void> => {
  return forceStateOnElements(page, selector, FOCUS_HOVER_STATE);
};

const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const forceStateOnElements = async (page: Page, selector: string, states: ForcedPseudoClasses[]): Promise<void> => {
  const cdp: CDPSession = await page.context().newCDPSession(page); // each selector needs their own cdp session, otherwise forcedPseudoStates are not persisted
  // const cdp = await page.target().createCDPSession(); // each selector needs their own cdp session, otherwise forcedPseudoStates are not persisted
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
const resolveSelector = (
  selector: string
): { hostElementSelector: string; shadowRootNodeName: string; deepShadowRootNodeName: string } => {
  const [hostElementSelector, shadowRootNodeName, deepShadowRootNodeName] = selector.split('>>>').map((x) => {
    return x.trim();
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

const findBackendNodeIds = (currentNode: Protocol.DOM.Node, selector: string): BackendNodeId[] => {
  const attributes = currentNode.attributes || [];
  // support tag names, ids & class names
  if (
    currentNode.localName === selector ||
    (selector.startsWith('#') && selector.replace('#', '') === attributes[attributes.indexOf('id') + 1]) ||
    (selector.startsWith('.') && selector.replace('.', '') === attributes[attributes.indexOf('class') + 1])
  ) {
    return [currentNode.backendNodeId];
  } else if (currentNode.children) {
    return currentNode
      .children!.map((child) => findBackendNodeIds(child, selector))
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
