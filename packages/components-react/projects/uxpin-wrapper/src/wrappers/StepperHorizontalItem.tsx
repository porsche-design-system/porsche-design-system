'use client';

import { forwardRef, type ForwardedRef, type PropsWithChildren, useEffect } from 'react';
import {
    StepperHorizontalItem as PStepperHorizontalItem,
    PStepperHorizontalItemProps,
} from "../lib/components";

export type UXPinStepperHorizontalProps = PStepperHorizontalItemProps & {
    /**
     * @uxpinignoreprop
     */
    activeStepIndex?: number;
    /**
     * @uxpinignoreprop
     */
    index?: number;
    /**
     * @uxpinignoreprop
     */
    onActiveStateChange?:(index: number) => void;
}

export const StepperHorizontalItem = forwardRef(
  (props: PropsWithChildren<UXPinStepperHorizontalProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {

    useEffect(() => {
      if (props.state === 'current' && props.index !== undefined && props.onActiveStateChange) {
        props.onActiveStateChange(props.index);
      }

      props.uxpinOnChange('', props.state, 'state');
    }, [props.state])

    const decoratedProps = {...props };

    if (props.activeStepIndex !== props.index && props.state === 'current') {
      decoratedProps.state = undefined;
      props.uxpinOnChange(props.state, decoratedProps.state, 'state');
    } else if (props.activeStepIndex === props.index) {
      decoratedProps.state = 'current';
      props.uxpinOnChange(props.state, decoratedProps.state, 'state');
    }


    return <PStepperHorizontalItem {...decoratedProps}  ref={ref} />;
  }
);
