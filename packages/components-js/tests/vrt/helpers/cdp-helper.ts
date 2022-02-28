import type { Theme } from '@porsche-design-system/utilities-v2';
import Protocol from 'devtools-protocol';
import { CDPSession, Page } from 'puppeteer';
import NodeId = Protocol.DOM.NodeId;
import BackendNodeId = Protocol.DOM.BackendNodeId;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = typeof FORCED_PSEUDO_CLASSES[number];

const HOVER_STATE: ForcedPseudoClasses[] = ['hover'];
const FOCUS_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
const FOCUS_HOVER_STATE = HOVER_STATE.concat(FOCUS_STATE);

const allThemes: Theme[] = ['light', 'dark', 'light-electric', 'dark-electric'];
const ALL_STATES = ['hover', 'focus', 'focus-hover'] as const;

export type StateType = typeof ALL_STATES[number];

export type GetMarkup = () => string;
export type GetThemedMarkup = (theme: Theme) => string;

export const getBodyMarkup = (getElements: GetMarkup) =>
  ALL_STATES.map(
    (state) => `<div class="playground light ${state}">
  ${getElements()}
</div>`
  ).join('\n');

export const getThemedBodyMarkup = (
  getThemedElements: GetThemedMarkup,
  opts?: { themes?: Theme[]; states?: StateType[] }
): string => {
  const { themes = ['light', 'dark'], states = ALL_STATES } = opts ?? {};

  return states
    .map((state) =>
      allThemes
        .filter((theme) => themes.includes(theme))
        .map((theme) => `<div class="playground ${theme} ${state}">${getThemedElements(theme)}</div>`)
    )
    .flat()
    .join('\n');
};

const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
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
        await Promise.all(
          nodeIds.map(async (nodeId) => await getElementNodeIdsInShadowRoot(cdp, nodeId, deepShadowRootNodeName))
        )
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
  const [hostElementSelector, shadowRootNodeName, deepShadowRootNodeName] = selector.split('>>>').map((x) => x.trim());

  if (shadowRootNodeName && !shadowRootNodeName.match(/^[a-z-]+(:first-child)?$/)) {
    throw new Error(`">>> ${shadowRootNodeName}" selector has to be an "Element.localName" in shadow-root`);
  }
  if (deepShadowRootNodeName && !deepShadowRootNodeName.match(/^[a-z-]+(:first-child)?$/)) {
    throw new Error(`">>> ${deepShadowRootNodeName}" selector has to be an "Element.localName" in shadow-root`);
  }

  return { hostElementSelector, shadowRootNodeName, deepShadowRootNodeName };
};

const getHostElementNodeIds = async (cdp: CDPSession, selector: string): Promise<NodeId[]> => {
  await cdp.send('DOM.getDocument');
  const { root } = (await cdp.send('DOM.getDocument', {
    depth: 0,
  })) as Protocol.DOM.GetDocumentResponse;

  return (
    (await cdp.send('DOM.querySelectorAll', {
      nodeId: root.nodeId,
      selector,
    })) as Protocol.DOM.QuerySelectorAllResponse
  ).nodeIds;
};

export const findBackendNodeIds = (currentNode: Protocol.DOM.Node, localNodeName: string): BackendNodeId[] => {
  if (currentNode.localName === localNodeName) {
    return [currentNode.backendNodeId];
  } else {
    return currentNode.children
      ?.map((child) => findBackendNodeIds(child, localNodeName))
      .flat()
      .filter((x) => x);
  }
};

const getElementNodeIdsInShadowRoot = async (cdp: CDPSession, nodeId: NodeId, selector: string): Promise<NodeId[]> => {
  const hostNode: Protocol.DOM.Node = (
    (await cdp.send('DOM.describeNode', {
      nodeId,
      depth: -1,
      pierce: true,
    })) as Protocol.DOM.DescribeNodeResponse
  ).node;

  const backendNodeIds = hostNode.shadowRoots && findBackendNodeIds(hostNode.shadowRoots[0], selector);

  return backendNodeIds
    ? (
        (await cdp.send('DOM.pushNodesByBackendIdsToFrontend', {
          backendNodeIds,
        })) as Protocol.DOM.PushNodesByBackendIdsToFrontendResponse
      ).nodeIds
    : undefined;
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
