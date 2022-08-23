import { ForwardedRef, forwardRef, PropsWithChildren, useRef } from 'react';
import { useBrowserLayoutEffect, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import { getPaddingStyles } from '../../spacing';
import { partitionProps } from '../../form-utils';
import { PCheckboxWrapperProps } from '../../lib/components/CheckboxWrapper/CheckboxWrapper';
import { DummyCheckbox, DummyCheckboxProps, dummyCheckboxPropsKeys } from '../../dummy/DummyCheckbox';

export type PCheckboxProps = PCheckboxWrapperProps & DummyCheckboxProps;

export const Checkbox = forwardRef(
  (props: PropsWithChildren<PCheckboxProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const elementRef = useRef<HTMLElement>();
    const Tag = usePrefix('p-checkbox-wrapper');

    const [dummyCheckboxProps, otherProps] = partitionProps(props, dummyCheckboxPropsKeys);

    const {
      hideLabel = false,
      label = '',
      message = '',
      state = 'none',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      ...rest
    } = otherProps;

    const propsToSync = [hideLabel, label, message, state];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      ['hideLabel', 'label', 'message', 'state'].forEach(
        (propName, i) => ((current as any)[propName] = propsToSync[i])
      );
    }, propsToSync);

    const wrapperProps = {
      ...rest,
      style: { ...getPaddingStyles({ spacingTop, spacingLeft, spacingRight, spacingBottom }) },
      ref: syncRef(elementRef, ref),
    };

    return (
      <Tag {...wrapperProps}>
        <DummyCheckbox type="checkbox" {...dummyCheckboxProps} />
      </Tag>
    );
  }
);
