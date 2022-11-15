import { CSSProperties } from 'react';
import { DummyTextarea, DummyTextareaProps, dummyTextareaPropsKeys } from '../../dummy/DummyTextarea';
import { PTextareaWrapperProps, TextareaWrapper } from '../../lib/components/TextareaWrapper/TextareaWrapper';
import { partitionProps } from '../../form-utils';

type TextareaStyleProps = {
  /**
   * `min-height` in pixels
   */
  height?: number;
};

export type TextareaProps = PTextareaWrapperProps & TextareaStyleProps & DummyTextareaProps;

export const Textarea = (props: TextareaProps): JSX.Element => {
  const { height, ...rest } = props;
  const [wrapperProps, dummyTextareaProps] = partitionProps<PTextareaWrapperProps, DummyTextareaProps>(
    rest,
    dummyTextareaPropsKeys
  );

  const minHeight = height || undefined;
  const style: CSSProperties = { minHeight };

  return (
    <TextareaWrapper {...wrapperProps}>
      <DummyTextarea {...dummyTextareaProps} style={style} />
    </TextareaWrapper>
  );
};
