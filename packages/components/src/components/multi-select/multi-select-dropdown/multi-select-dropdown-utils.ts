import {
  DROPDOWN_DIRECTIONS_INTERNAL,
  DropdownDirectionInternal,
} from '../../select-wrapper/select-wrapper/select-wrapper-utils';
import { getHTMLElements } from '../../../utils';
import { OPTION_HEIGHT } from '../../select-wrapper/select-wrapper/select-wrapper-styles';
import { INPUT_HEIGHT } from '../../../styles/form-styles';

const MAX_CHILDREN = 10;

export type MultiSelectDropdownOpenChangeEvent = { isOpen: boolean };
export const DROPDOWN_DIRECTIONS = [...DROPDOWN_DIRECTIONS_INTERNAL, 'auto'] as const;
export type MultiSelectDropdownDirection = (typeof DROPDOWN_DIRECTIONS)[number];

export const determineDropdownDirection = (host: HTMLElement): DropdownDirectionInternal => {
  const { length } = getHTMLElements(host.shadowRoot, '.option:not([aria-hidden="true"])');
  const { top } = host.getBoundingClientRect();

  const listHeight = OPTION_HEIGHT * (length > MAX_CHILDREN ? MAX_CHILDREN : length) + 14; // 26 = 2 x 6px padding + 2px border
  const spaceBottom = window.innerHeight - top - INPUT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};
