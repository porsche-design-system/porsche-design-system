import { DummySelect, DummySelectProps, dummySelectPropsKeys } from '../../dummy/DummySelect';
import { PSelectWrapperProps, SelectWrapper } from '../../lib/components/SelectWrapper/SelectWrapper';
import { partitionProps } from '../../form-utils';

export type SelectProps = PSelectWrapperProps & DummySelectProps;

export const SelectWrapperDummy = (props: SelectProps): JSX.Element => {
  const [wrapperProps, dummySelectProps] = partitionProps<PSelectWrapperProps, DummySelectProps>(
    props,
    dummySelectPropsKeys
  );

  return (
    <SelectWrapper {...wrapperProps}>
      <DummySelect {...dummySelectProps} />
    </SelectWrapper>
  );
};
