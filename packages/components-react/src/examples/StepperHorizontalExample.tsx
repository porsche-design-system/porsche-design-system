import {
  PButton,
  PButtonGroup,
  PHeadline,
  PStepperHorizontal,
  PStepperHorizontalItem,
  PText,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react';
import type { StepperState, StepChangeEvent } from '@porsche-design-system/components-react';
import { useState } from 'react';

type StepperHorizontalItemProps = {
  state?: StepperState;
  name: string;
  isComplete?: boolean;
};
export const StepperHorizontalExample = (): JSX.Element => {
  const [email, setEmail] = useState('');

  const [steps, setSteps] = useState<StepperHorizontalItemProps[]>([
    {
      state: 'current',
      name: 'Personal details',
      isComplete: true,
    },
    {
      name: 'Enter e-mail',
    },
    {
      name: 'Overview',
    },
  ]);

  const stepContent: JSX.Element[] = [
    <form>
      <PHeadline tag="h2" variant="headline-2">
        Personal Information:
      </PHeadline>
      <PText>Some personal information</PText>
    </form>,
    <form>
      <PTextFieldWrapper label={'E-Mail'}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setIsComplete(e.target.value, 1);
            setEmail(e.target.value);
          }}
        />
      </PTextFieldWrapper>
    </form>,
    <div>
      <PHeadline tag="h2" variant="headline-2">
        Overview:
      </PHeadline>
      <PText>Personal Information: Some personal Information</PText>
      <PText>E-mail: {email}</PText>
    </div>,
  ];

  const setIsComplete = (value: string, index: number) => {
    const newState = [...steps];
    if (!!value.trim()) {
      newState[index].isComplete = true;
      setSteps(newState);
    } else {
      newState[index].isComplete = false;
      setSteps(newState);
    }
  };

  const getActiveStepIndex = (steps: StepperHorizontalItemProps[]): number =>
    steps.findIndex((step) => step.state === 'current');

  const onPreviousStep = (): void => {
    const newState = [...steps];
    const activeStepIndex = getActiveStepIndex(newState);

    delete newState[activeStepIndex].state;
    newState[activeStepIndex - 1].state = 'current';

    setSteps(newState);
  };

  const onNextStep = (e: any): void => {
    const newState = [...steps];
    const activeStepIndex = getActiveStepIndex(newState);

    const nextIndex = findNextIncompleteStep();

    for (let i = activeStepIndex; i < nextIndex; i++) {
      newState[i].state = 'complete';
    }

    newState[nextIndex].state = 'current';

    setSteps(newState);
  };

  const handleStepChange = (e: CustomEvent<StepChangeEvent>) => {
    const { activeStepIndex } = e.detail;

    const newState = [...steps];
    newState[activeStepIndex].state = 'current';
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      delete newState[i].state;
    }
    setSteps(newState);
  };

  const findNextIncompleteStep = (): number => steps.findIndex((step) => !step.isComplete);

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
        {getActiveStepIndex(steps) !== 0 && (
          <PButton variant="tertiary" onClick={onPreviousStep}>
            Previous Step
          </PButton>
        )}
        {getActiveStepIndex(steps) !== steps.length - 1 && (
          <PButton variant="primary" hidden={getActiveStepIndex(steps) === steps.length - 1} onClick={onNextStep}>
            Next Step
          </PButton>
        )}
      </PButtonGroup>
    </>
  );
};
