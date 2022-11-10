import { CSSProperties } from 'react';
import { DummyTextarea, DummyTextareaProps, dummyTextareaPropsKeys } from '../../dummy/DummyTextarea';
import { PTextareaWrapperProps, TextareaWrapper } from '../../lib/components/TextareaWrapper/TextareaWrapper';
import { partitionProps } from '../../form-utils';

type TextareaStyleProps = {
  /**
   * `min-height` style property
   */
  height?: string;
};

export type TextareaProps = PTextareaWrapperProps & TextareaStyleProps & DummyTextareaProps;

export const Textarea = (props: TextareaProps): JSX.Element => {
  const { height, ...rest } = props;
  const [wrapperProps, dummyTextareaProps] = partitionProps<PTextareaWrapperProps, DummyTextareaProps>(
    rest,
    dummyTextareaPropsKeys
  );

  const minHeight = parseDimension(height);
  const style: CSSProperties = { minHeight };

  return (
    <TextareaWrapper {...wrapperProps}>
      <DummyTextarea {...dummyTextareaProps} style={style} />
    </TextareaWrapper>
  );
};

// Return the style property to be assigned from the user's input in the UXPin Property Panel
// - `undefined` if the input is empty or if `0` is entered
// - the string entered by the user `300px` (to handle units such as `rem`)
// - a number if the input has no unit (treated as pixels in React)
function parseDimension(dimension: string | undefined): string | number | undefined {
  if (!dimension) return undefined;
  if (!isNumber(dimension)) {
    return dimension;
  }
  return Number(dimension) || undefined;
}

function isNumber(input: string) {
  return !Number.isNaN(Number(input));
}
