'use client';

import { cloneElement, forwardRef, type ForwardedRef, type PropsWithChildren, useRef } from 'react';
import {
  StepperHorizontal as PStepperHorizontal,
  PStepperHorizontalProps,
  PStepperHorizontalItemProps,
} from '../../lib/components';

type UXPinStepperHorizontalProps = PStepperHorizontalProps & {
  activeStepIndex?: number;
};

export const StepperHorizontal = forwardRef(
  (
    { activeStepIndex, ...rest }: PropsWithChildren<UXPinStepperHorizontalProps>,
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    const onActiveStateChange = (index) => {
      rest.uxpinOnChange(activeStepIndex, index, 'activeStepIndex');
    };

    const props = {
      ...rest,
      onStepChange: (e) => {
        onActiveStateChange(e.detail.activeStepIndex);
        if (rest.onStepChange) {
          rest.onStepChange(e);
        }
      },
    };

    if (props.children && Array.isArray(props.children)) {
      props.children = props.children.map((child, i) => {
        return cloneElement(child, {
          activeStepIndex,
          index: i,
          onActiveStateChange,
        } as Partial<PStepperHorizontalItemProps>);
      });
    }

    return <PStepperHorizontal {...props} ref={ref} />;
  }
);
