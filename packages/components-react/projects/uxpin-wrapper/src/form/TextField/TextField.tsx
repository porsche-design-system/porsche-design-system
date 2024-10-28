import { DummyTextField, DummyTextFieldProps, dummyTextFieldPropsKeys } from '../../dummy/DummyTextField';
import { PTextFieldWrapperProps, TextFieldWrapper } from '../../lib/components/TextFieldWrapper/TextFieldWrapper';
import { partitionProps } from '../../form-utils';

export type TextFieldProps = PTextFieldWrapperProps & DummyTextFieldProps;

export const TextField = (props: TextFieldProps): JSX.Element => {
  const [wrapperProps, dummyTextFieldProps] = partitionProps<PTextFieldWrapperProps, DummyTextFieldProps>(
    props,
    dummyTextFieldPropsKeys
  );

  return (
    <TextFieldWrapper {...wrapperProps}>
      <DummyTextField {...dummyTextFieldProps} />
    </TextFieldWrapper>
  );
};
