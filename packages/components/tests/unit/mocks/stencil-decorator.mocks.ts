// global alternative to using the following in every component test
//
// vi.mock('@stencil/core', () => ({
//   Component: vi.fn(),
//   Element: vi.fn(),
//   State: vi.fn(),
//   Prop: vi.fn(),
// }));
import { vi } from 'vitest';

export const Component = vi.fn();
export const Element = vi.fn();
export const Event = vi.fn();
export const Listen = vi.fn();
export const Prop = vi.fn();
export const Method = vi.fn();
export const State = vi.fn();
export const Watch = vi.fn();
export const h = vi.fn();

export const forceUpdate = vi.fn();

export const AttachInternals = vi.fn();
