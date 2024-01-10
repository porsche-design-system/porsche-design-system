import {
  type StepperHorizontalUpdateEventDetail,
  type StepperHorizontalItemState,
  PButton,
  PButtonGroup,
  PStepperHorizontal,
  PStepperHorizontalItem,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

type StepperHorizontalItemProps = {
  state?: StepperHorizontalItemState;
  name: string;
};

export const StepperHorizontalExample = (): JSX.Element => {
  const [steps, setSteps] = useState<StepperHorizontalItemProps[]>([
    {
      state: 'current',
      name: 'Enter personal details',
    },
    {
      name: 'Confirm e-mail',
    },
    {
      name: 'Set password',
    },
  ]);

  const stepContent: string[] = [
    'A form with personal details could be displayed here.',
    'A form with a verification code input field could be displayed here.',
    'A form with a password input field could be displayed here.',
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

  const onUpdate = (e: CustomEvent<StepperHorizontalUpdateEventDetail>): void => {
    const { activeStepIndex } = e.detail;

    const newState = [...steps];
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      // reset step state when going back via stepper horizontal item click
      delete newState[i].state;
    }
    newState[activeStepIndex].state = 'current';
    setSteps(newState);
  };

  return (
    <>
      <PStepperHorizontal onUpdate={onUpdate}>
        {steps.map(({ state, name }) => (
          <PStepperHorizontalItem key={name} state={state}>
            {name}
          </PStepperHorizontalItem>
        ))}
      </PStepperHorizontal>

      {stepContent.map((content, i) => getActiveStepIndex(steps) === i && <PText key={i}>{content}</PText>)}

      <PButtonGroup>
        <PButton
          type="button"
          icon="arrow-head-left"
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
