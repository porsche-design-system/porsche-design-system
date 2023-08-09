import { getClosestHTMLElement } from '../dom';

export const isWithinForm = (host: HTMLElement): boolean => !!getClosestHTMLElement(host, 'form');
