import { applyPropertyRecursively } from '@/utils/generator/applyPropertyRecursively';
import { describe, expect, it } from 'vitest';
import { flyoutTestConfig } from '../data/generator.testdata';

describe('applyPropertyRecursively', () => {
  it('should apply a property to all elements in the config', () => {
    // Assert the property is not set before applying
    expect((flyoutTestConfig[0] as any).properties).not.toHaveProperty('theme');
    expect((flyoutTestConfig[1] as any).properties).not.toHaveProperty('theme');
    expect((flyoutTestConfig[1] as any).children?.[0].properties).not.toHaveProperty('theme');
    expect((flyoutTestConfig[1] as any).children?.[1]).not.toHaveProperty('properties.theme');
    expect((flyoutTestConfig[1] as any).children?.[2].properties).not.toHaveProperty('theme'); // div
    expect((flyoutTestConfig[1] as any).children?.[3]).not.toHaveProperty('properties.theme');
    expect((flyoutTestConfig[1] as any).children?.[4].properties).not.toHaveProperty('theme');
    expect((flyoutTestConfig[1] as any).children?.[4].children?.[0].properties).not.toHaveProperty('theme');

    const result = applyPropertyRecursively(flyoutTestConfig, 'theme', 'dark');

    expect((result[0] as any).properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).children?.[0].properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).children?.[1].properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).children?.[2].properties).not.toHaveProperty('theme'); // div
    expect((result[1] as any).children?.[3].properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).children?.[4].properties).toHaveProperty('theme', 'dark');
    expect((result[1] as any).children?.[4].children?.[0].properties).toHaveProperty('theme', 'dark');
  });

  it('should not apply property to non-PDS components when onlyPdsComponents is false', () => {
    expect((flyoutTestConfig[1] as any).children?.[1]).not.toHaveProperty('properties.theme');
    expect((flyoutTestConfig[1] as any).children?.[2].properties).not.toHaveProperty('theme', 'light'); // div
    const result = applyPropertyRecursively(flyoutTestConfig, 'theme', 'light', false);
    expect((result[1] as any).children?.[1].properties).toHaveProperty('theme', 'light');
    expect((result[1] as any).children?.[2].properties).toHaveProperty('theme', 'light'); // div
  });

  it('should override existing property if overrideExisting is true', () => {
    expect((flyoutTestConfig[1] as any).properties).toHaveProperty('open', false);
    const result = applyPropertyRecursively(flyoutTestConfig, 'open' as any, true, true, true);
    expect((result[1] as any).properties).toHaveProperty('open', true);
  });

  it('should not override existing property if overrideExisting is false', () => {
    expect((flyoutTestConfig[1] as any).properties).toHaveProperty('open', false);
    const result = applyPropertyRecursively(flyoutTestConfig, 'open' as any, true, true, false);
    expect((result[1] as any).properties).toHaveProperty('open', false);
  });
});
