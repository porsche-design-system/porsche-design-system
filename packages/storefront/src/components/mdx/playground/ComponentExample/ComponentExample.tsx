import type { FrameworkExample, FrameworkExampleId } from '@porsche-design-system/examples-framework';
import { frameworkExamplePreviews } from '@porsche-design-system/examples-framework/previews';
import type { ComponentType } from 'react';
import { ComponentExamplePlayground, type ComponentExamplePlaygroundProps } from './ComponentExamplePlayground';

type ComponentExampleProps = Omit<ComponentExamplePlaygroundProps, 'children'> & {
  codeSample: FrameworkExample<FrameworkExampleId>;
  disableDemo?: boolean;
  /** The preview of a `standalone` example, which `frameworkExamplePreviews` leaves out. */
  preview?: ComponentType;
};

const getPreview = (id: FrameworkExampleId): ComponentType | undefined =>
  id in frameworkExamplePreviews ? frameworkExamplePreviews[id as keyof typeof frameworkExamplePreviews] : undefined;

/**
 * A framework example: its code for every framework and its live preview. A server component, because it looks the
 * preview up by the example's id and hands the client a reference to its module.
 */
export const ComponentExample = ({ codeSample, disableDemo = false, preview, ...props }: ComponentExampleProps) => {
  const Preview = preview ?? getPreview(codeSample.id);
  if (!Preview && !disableDemo) {
    throw new Error(`[storefront] "${codeSample.id}" is a standalone framework example; pass its preview`);
  }

  return (
    <ComponentExamplePlayground codeSample={codeSample} {...props}>
      {!disableDemo && Preview && <Preview />}
    </ComponentExamplePlayground>
  );
};
