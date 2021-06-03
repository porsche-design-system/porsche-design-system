import Protocol from 'devtools-protocol';
import { CDPSession, Page } from 'puppeteer';
import { Theme } from '@porsche-design-system/utilities';
import NodeId = Protocol.DOM.NodeId;
import BackendNodeId = Protocol.DOM.BackendNodeId;

const FORCED_PSEUDO_CLASSES = ['hover', 'focus', 'focus-visible'] as const;
type ForcedPseudoClasses = typeof FORCED_PSEUDO_CLASSES[number];

const HOVERED_STATE: ForcedPseudoClasses[] = ['hover'];
const FOCUSED_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
const FOCUSED_HOVERED_STATE = HOVERED_STATE.concat(FOCUSED_STATE);

export type GetMarkup = () => string;
export type GetThemedMarkup = (theme: Theme) => string;

export const getBodyMarkup = (getElements: GetMarkup) => `
  <p-headline variant="headline-4">Hovered</p-headline>
  <div class="playground light hovered">
    ${getElements()}
  </div>
  <p-headline variant="headline-4">Focused</p-headline>
  <div class="playground light focused">
    ${getElements()}
  </div>
  <p-headline variant="headline-4">Focused+Hovered</p-headline>
  <div class="playground light focused-hovered">
    ${getElements()}
  </div>`;

export const getThemedBodyMarkup = (getThemedElements: GetThemedMarkup): string => `
  <p-headline variant="headline-4">Hovered</p-headline>
  <div class="playground light hovered">
    ${getThemedElements('light')}
  </div>
  <div class="playground dark hovered">
    ${getThemedElements('dark')}
  </div>
  <p-headline variant="headline-4">Focused</p-headline>
  <div class="playground light focused">
    ${getThemedElements('light')}
  </div>
  <div class="playground dark focused">
    ${getThemedElements('dark')}
  </div>
  <p-headline variant="headline-4">Focused+Hovered</p-headline>
  <div class="playground light focused-hovered">
    ${getThemedElements('light')}
  </div>
  <div class="playground dark focused-hovered">
    ${getThemedElements('dark')}
  </div>`;

export const generateGUID = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const forceHoveredState = async (page: Page, selector: string): Promise<void> => {
  await forceStateOnElements(page, selector, HOVERED_STATE);
};
export const forceFocusedState = async (page: Page, selector: string): Promise<void> => {
  await forceStateOnElements(page, selector, FOCUSED_STATE);
};
export const forceFocusedHoveredState = async (page: Page, selector: string): Promise<void> => {
  await forceStateOnElements(page, selector, FOCUSED_HOVERED_STATE);
};

const forceStateOnElements = async (page: Page, selector: string, states: ForcedPseudoClasses[]): Promise<void> => {
  const cdp = await page.target().createCDPSession(); // each selector needs their own cdp session, otherwise forcedPseudoStates are not persisted
  const { hostElementSelector, shadowRootNodeName } = resolveSelector(selector);
  const hostNodeIds: NodeId[] = await getHostElementNodeIds(cdp, hostElementSelector);

  for (const hostNodeId of hostNodeIds) {
    const nodeId = shadowRootNodeName
      ? await getElementNodeIdInShadowRoot(cdp, hostNodeId, shadowRootNodeName)
      : hostNodeId;
    //only execute if a valid nodeId was found
    if (nodeId) {
      await forceStateOnNodeId(cdp, nodeId, states);
    }
  }
};
export const resolveSelector = (selector: string): { hostElementSelector: string; shadowRootNodeName: string } => {
  const selectorParts = selector.split('>>>');
  const shadowRootNodeName = selectorParts[1]?.trim();

  if (shadowRootNodeName && !shadowRootNodeName.match(/^[a-z-]+$/)) {
    throw new Error(`">>> ${shadowRootNodeName}" selector has to be an "Element.localName" in shadow-root`);
  }

  return { hostElementSelector: selectorParts[0].trim(), shadowRootNodeName };
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

  return backendNodeId
    ? (
        (await cdp.send('DOM.pushNodesByBackendIdsToFrontend', {
          backendNodeIds: [backendNodeId],
        })) as Protocol.DOM.PushNodesByBackendIdsToFrontendResponse
      ).nodeIds[0]
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
