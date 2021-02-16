// global alternative to using the following in every component test
//
// jest.mock('@stencil/core', () => ({
//   Component: jest.fn(),
//   Element: jest.fn(),
//   State: jest.fn(),
//   Prop: jest.fn(),
// }));

export const Component = jest.fn();
export const Element = jest.fn();
export const State = jest.fn();
export const Prop = jest.fn();
export const Listen = jest.fn();
