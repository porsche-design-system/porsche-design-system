import { getAngularPartialExample } from '@/utils/partials/getAngularPartialExample';
import { expect } from 'vitest';

it('should return correct partial markup for getVanillaJsPartialExample', () => {
  const partialCalls = [
    {
      params: [],
    },
    {
      comment: 'Alternative: With custom prefix to match your prefixed components',
      params: [
        {
          key: 'prefix',
          value: 'custom-prefix',
        },
      ],
    },
    {
      comment: 'Alternative: With multiple prefixes to match prefixed components coming from micro frontends',
      params: [
        {
          key: 'prefix',
          value: ['', 'custom-prefix', 'another-prefix'],
        },
      ],
    },
  ];
  const partialExample = getAngularPartialExample('getInitialStyles', 'head', partialCalls);
  expect(partialExample).toMatchSnapshot();
});
