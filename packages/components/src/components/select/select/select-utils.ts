import { FormState } from '../../../utils/form/form-state';
import { SelectDropdownDirection } from '../../../utils';

export type SelectState = FormState;
export type SelectDirection = SelectDropdownDirection;

export type SelectUpdateEventDetail = {
  name: string;
  value: string[];
};
