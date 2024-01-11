<script setup lang="ts">
  import {
    type StepperHorizontalItemState,
    type StepperHorizontalUpdateEventDetail,
    PButton,
    PButtonGroup,
    PStepperHorizontal,
    PStepperHorizontalItem,
    PText,
  } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  type StepperHorizontalItemProps = {
    state?: StepperHorizontalItemState;
    name: string;
  };

  const steps = ref<StepperHorizontalItemProps[]>([
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
    const newState = [...steps.value];
    const activeStepIndex = getActiveStepIndex(newState);

    if (direction === 'next') {
      newState[activeStepIndex].state = 'complete';
      newState[activeStepIndex + 1].state = 'current';
    } else {
      delete newState[activeStepIndex].state;
      newState[activeStepIndex - 1].state = 'current';
    }

    steps.value = newState;
  };

  const onUpdate = (e: StepperHorizontalUpdateEventDetail): void => {
    const { activeStepIndex } = e;

    const newState = [...steps.value];
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      // reset step state when going back via stepper horizontal item click
      delete newState[i].state;
    }
    newState[activeStepIndex].state = 'current';
    steps.value = newState;
  };
</script>

<template>
  <PStepperHorizontal @update="onUpdate">
    <PStepperHorizontalItem v-for="step in steps" :key="step.name" :state="step.state">
      {{ step.name }}
    </PStepperHorizontalItem>
  </PStepperHorizontal>

  <PText :key="getActiveStepIndex(steps)">{{ stepContent[getActiveStepIndex(steps)] }}</PText>

  <PButtonGroup>
    <PButton
      type="button"
      :icon="'arrow-head-left'"
      :variant="'tertiary'"
      @click="onNextPrevStep('prev')"
      :disabled="getActiveStepIndex(steps) === 0"
    >
      Previous Step
    </PButton>

    <PButton
      type="button"
      :variant="'primary'"
      :disabled="getActiveStepIndex(steps) === steps.length - 1"
      @click="onNextPrevStep('next')"
    >
      Next Step
    </PButton>
  </PButtonGroup>
</template>
