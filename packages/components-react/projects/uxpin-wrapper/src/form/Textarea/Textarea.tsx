import { DummyTextarea, DummyTextareaProps, dummyTextareaPropsKeys } from '../../dummy/DummyTextarea';
import { PTextareaWrapperProps, TextareaWrapper } from '../../lib/components/TextareaWrapper/TextareaWrapper';
import { partitionProps } from '../../form-utils';

export type TextareaProps = PTextareaWrapperProps & DummyTextareaProps;

export const Textarea = (props: TextareaProps): JSX.Element => {
  const [dummyTextareaProps, wrapperProps] = partitionProps<TextareaProps, DummyTextareaProps>(
    props,
    dummyTextareaPropsKeys
  );

  return (
    <TextareaWrapper {...wrapperProps}>
      <DummyTextarea {...dummyTextareaProps} />
    </TextareaWrapper>
  );
};
