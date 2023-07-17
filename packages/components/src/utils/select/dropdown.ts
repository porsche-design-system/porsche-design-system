export const SELECT_DROPDOWN_DIRECTIONS_INTERNAL = ['down', 'up'] as const;
export type SelectDropdownDirectionInternal = (typeof SELECT_DROPDOWN_DIRECTIONS_INTERNAL)[number];
export const SELECT_DROPDOWN_DIRECTIONS = [...SELECT_DROPDOWN_DIRECTIONS_INTERNAL, 'auto'] as const;
export type SelectDropdownDirection = (typeof SELECT_DROPDOWN_DIRECTIONS)[number];
