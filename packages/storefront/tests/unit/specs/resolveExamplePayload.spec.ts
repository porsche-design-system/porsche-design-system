import type { FrameworkMarkup } from '@porsche-design-system/shared';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/checkbox/accessibility/examples/hidden-label-without-accessible-name/example';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/modal/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import type { ExampleMarkupSample } from '@/models/accessibilityMeta';
import { resolveExamplePayload } from '@/utils/generator/resolveExamplePayload';

const context = {
  tag: 'p-checkbox',
  key: 'hiddenLabelWithoutAccessibleName',
  side: 'antiPattern',
  framework: 'vanilla-js',
};

describe('resolveExamplePayload()', () => {
  it.each([
    'vanilla-js',
    'angular',
    'react',
    'vue',
  ] as const)('generates non-empty %s markup from a story', (framework) => {
    expect(
      resolveExamplePayload(hiddenLabelWithoutAccessibleNameA11yExample.antiPattern, framework, {
        ...context,
        framework,
      })
    ).not.toBe('');
  });

  it('emits bare snippet markup without runnable-file scaffolding', () => {
    const markup = resolveExamplePayload(
      hiddenLabelWithoutAccessibleNameA11yExample.antiPattern,
      'vanilla-js',
      context
    );

    expect(markup).not.toContain('<!doctype html>');
    expect(markup).toMatchInlineSnapshot(`"<p-checkbox name="terms" hide-label="true"></p-checkbox>"`);
  });

  // The `A11yHostAttributes` widening exists so anti-patterns can put `aria-*` / `role` directly on
  // the host. Each framework generator must pass such unknown host attributes through untouched,
  // while the recommendation keeps using the `aria` prop in that framework's binding syntax.
  it.each([
    ['vanilla-js', 'aria-haspopup="dialog"', `aria="{'aria-haspopup': 'dialog'}"`],
    ['angular', 'aria-haspopup="dialog"', `[aria]="{'aria-haspopup': 'dialog'}"`],
    ['vue', 'aria-haspopup="dialog"', `:aria="{'aria-haspopup': 'dialog'}"`],
    ['react', 'aria-haspopup="dialog"', `aria={{'aria-haspopup': 'dialog'}}`],
  ] as const)('keeps host-level aria on the anti-pattern and the aria prop on the recommendation in %s', (framework, expectedAntiPattern, expectedRecommended) => {
    const hostAriaContext = { ...context, tag: 'p-modal', key: 'ariaOnComponentHostVsAriaProp', framework };

    expect(
      resolveExamplePayload(ariaOnComponentHostVsAriaPropA11yExample.antiPattern, framework, hostAriaContext)
    ).toContain(expectedAntiPattern);
    expect(
      resolveExamplePayload(ariaOnComponentHostVsAriaPropA11yExample.recommended, framework, {
        ...hostAriaContext,
        side: 'recommended',
      })
    ).toContain(expectedRecommended);
  });

  it.each([
    ['vanilla-js', '<!-- slides -->'],
    ['angular', '<!-- slides -->'],
    ['vue', '<!-- slides -->'],
    ['react', '{/* slides */}'],
  ] as const)('renders a comment node in %s comment syntax', (framework, expected) => {
    const markup = resolveExamplePayload(
      { kind: 'story', story: { generator: () => [{ tag: 'p-carousel', children: [{ comment: 'slides' }] }] } },
      framework,
      { ...context, framework }
    );

    expect(markup).toContain(expected);
  });

  it('renders a top-level comment node alongside elements', () => {
    const markup = resolveExamplePayload(
      {
        kind: 'story',
        story: {
          generator: () => [{ tag: 'p-button', children: ['Add'] }, { comment: 'or use visible text' }],
        },
      },
      'react',
      { ...context, framework: 'react' }
    );

    expect(markup).toContain('{/* or use visible text */}');
  });

  it('returns an authored framework variant verbatim', () => {
    const frameworkMarkup: FrameworkMarkup = {
      'vanilla-js': '<p-checkbox></p-checkbox>',
      angular: '<p-checkbox></p-checkbox>',
      react: '<PCheckbox />',
      vue: '<PCheckbox />',
    };
    const example: ExampleMarkupSample = { frameworkMarkup };

    expect(resolveExamplePayload({ kind: 'example', example }, 'react', { ...context, framework: 'react' })).toBe(
      frameworkMarkup.react
    );
  });

  it('rejects empty framework variants', () => {
    const example: ExampleMarkupSample = {
      frameworkMarkup: { 'vanilla-js': '', angular: '', react: '', vue: '' },
    };

    expect(() => resolveExamplePayload({ kind: 'example', example }, 'vue', { ...context, framework: 'vue' })).toThrow(
      /p-checkbox example "hiddenLabelWithoutAccessibleName" antiPattern \(example, vue\) produced empty markup/
    );
  });

  it('rejects imperative multiline strings in story payloads', () => {
    expect(() =>
      resolveExamplePayload(
        { kind: 'story', story: { generator: () => ['if (open) {\n  mount();\n}'] } },
        'vanilla-js',
        context
      )
    ).toThrow(/contains an imperative multiline string/);
  });
});
