import { useState } from 'react';
import { componentsReady, PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(2);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PStepperHorizontal
        onStepChange={(e) => {
          setCurrentStep(e.detail.activeStepIndex);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      >
        <PStepperHorizontalItem data-testid="step1" state="complete">
          Step 1
        </PStepperHorizontalItem>
        <PStepperHorizontalItem data-testid="step2" state="complete">
          Step 2
        </PStepperHorizontalItem>
        <PStepperHorizontalItem data-testid="step3" state="current">
          Step 3
        </PStepperHorizontalItem>
      </PStepperHorizontal>
      <div data-testid="debug">
        {`Current Step: ${currentStep};`} {`Event Counter: ${eventCounter};`}
      </div>
    </>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
  expect(getByTestId('step1').shadowRoot).not.toBeNull();
  expect(getByTestId('step2').shadowRoot).not.toBeNull();
  expect(getByTestId('step3').shadowRoot).not.toBeNull();
});

it('should have working events', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  const debug = getByTestId('debug');
  const step1 = getByTestId('step1');
  const step2 = getByTestId('step2');

  expect(debug.innerHTML).toBe('Current Step: 2; Event Counter: 0;');

  await userEvent.click(step2);
  expect(debug.innerHTML).toBe('Current Step: 1; Event Counter: 1;');

  await userEvent.click(step1);
  expect(debug.innerHTML).toBe('Current Step: 0; Event Counter: 2;');
});
