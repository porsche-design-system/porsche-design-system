import { CheckboxWrapper, PCheckboxWrapperProps } from '../../lib/components/CheckboxWrapper/CheckboxWrapper';
import { DummyCheckbox, DummyCheckboxProps, dummyCheckboxPropsKeys } from '../../dummy/DummyCheckbox';
import { partitionProps } from '../../form-utils';

export type PCheckboxProps = PCheckboxWrapperProps & DummyCheckboxProps;

export const Checkbox = (props: PCheckboxProps): JSX.Element => {
  const [dummyCheckboxProps, wrapperProps] = partitionProps(props, dummyCheckboxPropsKeys);

  return (
    <CheckboxWrapper {...wrapperProps}>
      <DummyCheckbox type="checkbox" {...dummyCheckboxProps} />
    </CheckboxWrapper>
  );
};
