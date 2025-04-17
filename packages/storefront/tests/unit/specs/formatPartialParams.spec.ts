import type { PartialParam } from '@/models/partials';
import { formatPartialParams } from '@/utils/partials/formatPartialParams';
import { describe, expect, it } from 'vitest';

describe('formatPartialParams', () => {
  it('should return an empty string for an empty param array', () => {
    const params: PartialParam[] = [];
    expect(formatPartialParams(params)).toBe('');
  });

  it('should format a single string param correctly', () => {
    const params: PartialParam[] = [{ key: 'cdn', value: 'cn' }];
    expect(formatPartialParams(params)).toBe("{ cdn: 'cn' }");
  });

  it('should format a single array param correctly', () => {
    const params: PartialParam[] = [{ key: 'components', value: ['button', 'marque'] }];
    expect(formatPartialParams(params)).toBe("{ components: ['button', 'marque'] }");
  });

  it('should format multiple key-value pairs with mixed types', () => {
    const params: PartialParam[] = [
      { key: 'icons', value: ['arrow-head-right', 'plus'] },
      { key: 'cdn', value: 'cn' },
    ];
    expect(formatPartialParams(params)).toBe("{ icons: ['arrow-head-right', 'plus'], cdn: 'cn' }");
  });

  it('should handle single string prefix', () => {
    const params: PartialParam[] = [{ key: 'prefix', value: 'custom-prefix' }];
    expect(formatPartialParams(params)).toBe("{ prefix: 'custom-prefix' }");
  });

  it('should handle multiple prefixes in an array', () => {
    const params: PartialParam[] = [{ key: 'prefix', value: ['', 'custom-prefix', 'another-prefix'] }];
    expect(formatPartialParams(params)).toBe("{ prefix: ['', 'custom-prefix', 'another-prefix'] }");
  });

  it('should handle multiple calls with different formats', () => {
    const configs: PartialParam[][] = [
      [],
      [{ key: 'cdn', value: 'cn' }],
      [{ key: 'components', value: ['button', 'marque'] }],
      [
        { key: 'icons', value: ['arrow-head-right', 'plus'] },
        { key: 'cdn', value: 'cn' },
      ],
      [{ key: 'prefix', value: 'custom-prefix' }],
      [{ key: 'prefix', value: ['', 'custom-prefix', 'another-prefix'] }],
    ];

    const expectedOutputs = [
      '',
      "{ cdn: 'cn' }",
      "{ components: ['button', 'marque'] }",
      "{ icons: ['arrow-head-right', 'plus'], cdn: 'cn' }",
      "{ prefix: 'custom-prefix' }",
      "{ prefix: ['', 'custom-prefix', 'another-prefix'] }",
    ];

    configs.forEach((params, i) => {
      expect(formatPartialParams(params)).toBe(expectedOutputs[i]);
    });
  });
});
