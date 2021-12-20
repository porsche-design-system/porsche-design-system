import { getHTMLElement } from './dom';

export const validateLinkUsage = (host: HTMLElement, href: string | undefined) => {
  if (!href && !getHTMLElement(host, 'a')) {
    throw new Error(
      `Usage of ${host.tagName} is not valid. Please provide a href property. For further information see https://designsystem.porsche.com`
    );
  }
};
