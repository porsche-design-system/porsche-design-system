import { StepperHorizontalItem } from '../../StepperHorizontalItem';
import { StepperHorizontal } from '../StepperHorizontal';

export default (
  <StepperHorizontal uxpId="stepper-horizontal" activeStepIndex={0}>
    <StepperHorizontalItem uxpId="stepper-horizontal-step-1" state="current">
      Enter personal details
    </StepperHorizontalItem>
    <StepperHorizontalItem uxpId="stepper-horizontal-step-2">Confirm e-mail</StepperHorizontalItem>
    <StepperHorizontalItem uxpId="stepper-horizontal-step-3">Set password</StepperHorizontalItem>
  </StepperHorizontal>
);
