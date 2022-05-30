import type { StepChangeEvent, StepperState } from '@porsche-design-system/components-react';
import {
  PButton,
  PButtonGroup,
  PStepperHorizontal,
  PStepperHorizontalItem,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

type StepperHorizontalItemProps = {
  state?: StepperState;
  name: string;
};
export const StepperHorizontalExample = (): JSX.Element => {
  const [steps, setSteps] = useState<StepperHorizontalItemProps[]>([
    {
      state: 'current',
      name: 'Personal details',
    },
    {
      name: 'Enter e-mail',
    },
    {
      name: 'Overview',
    },
  ]);

  const stepContent: JSX.Element[] = [
    <PText>Your content of Step 1</PText>,
    <PText>Your content of Step 2</PText>,
    <PText>Your content of Step 3</PText>,
  ];

  const getActiveStepIndex = (steps: StepperHorizontalItemProps[]): number =>
    steps.findIndex((step) => step.state === 'current');

  const onNextPrevStep = (direction: 'next' | 'prev'): void => {
    const newState = [...steps];
    const activeStepIndex = getActiveStepIndex(newState);

    if (direction === 'next') {
      newState[activeStepIndex].state = 'complete';
      newState[activeStepIndex + 1].state = 'current';
    } else {
      delete newState[activeStepIndex].state;
      newState[activeStepIndex - 1].state = 'current';
    }

    setSteps(newState);
  };

  const handleStepChange = (e: CustomEvent<StepChangeEvent>) => {
    const { activeStepIndex } = e.detail;

    const newState = [...steps];
    newState[activeStepIndex].state = 'current';
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      // reset step state when going back via stepper horizontal item click
      delete newState[i].state;
    }
    setSteps(newState);
  };

  return (
    <>
      <PStepperHorizontal onStepChange={handleStepChange}>
        {steps.map(({ state, name }) => (
          <PStepperHorizontalItem key={name} state={state}>
            {name}
          </PStepperHorizontalItem>
        ))}
      </PStepperHorizontal>

      {stepContent.map((component, i) => (
        <div key={i} hidden={getActiveStepIndex(steps) !== i}>
          {component}
        </div>
      ))}

      <PButtonGroup>
        <PButton
          icon={'arrow-head-left'}
          variant="tertiary"
          onClick={() => onNextPrevStep('prev')}
          disabled={getActiveStepIndex(steps) === 0}
        >
          Previous Step
        </PButton>

        <PButton
          variant="primary"
          disabled={getActiveStepIndex(steps) === steps.length - 1}
          onClick={() => onNextPrevStep('next')}
        >
          Next Step
        </PButton>
      </PButtonGroup>
    </>
  );
};
