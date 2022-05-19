import {
  PButton,
  PCheckboxWrapper,
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [steps, setSteps] = useState<StepperHorizontalItemProps[]>([
    {
      state: 'current',
      name: 'Enter personal details',
    },
    {
      name: 'Confirm e-mail',
    },
    {
      name: 'Step 3',
    },
  ]);

  const stepContent: JSX.Element[] = [
    <form>
      <PTextFieldWrapper label={'Name'}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setIsComplete(e.target.value, 0);
            setName(e.target.value);
          }}
        />
      </PTextFieldWrapper>
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
      Order Summary:
      <PText>{name}</PText>
      <PText>{email}</PText>
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

    newState[activeStepIndex].state = 'complete';
    newState[findNextIncompleteStep()].state = 'current';

    setSteps(newState);
  };

  const handleStepChange = (e: CustomEvent<StepChangeEvent>) => {
    const { activeStepIndex, prevStepIndex, prevState } = e.detail;
    console.log('-> activeStepIndex', activeStepIndex);

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

      <div>
        <PButton variant="tertiary" disabled={getActiveStepIndex(steps) === 0} onClick={onPreviousStep}>
          Previous Step
        </PButton>
        <PButton variant="primary" disabled={getActiveStepIndex(steps) === steps.length - 1} onClick={onNextStep}>
          Next Step
        </PButton>
      </div>
    </>
  );
};
