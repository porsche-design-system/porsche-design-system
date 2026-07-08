# Fix Guide — ARIA and Names

## When to use

axe rules: `aria-*`, `button-name`, `link-name`, `aria-allowed-attr`, `aria-valid-attr-value`, `aria-required-attr`

## PDS rules

1. Pass ARIA via the component `aria` prop object — never `aria-*` on the host element
2. Icon-only controls need `aria-label`, `aria` prop or visible text (with `hide-label` if needed)
3. Do not add ARIA that conflicts with native semantics
4. Check each component's **Accessibility** tab in the [PDS documentation](https://designsystem.porsche.com/v4/components/button/accessibility/) (e.g. Button)

## Fix patterns

### Named button

```jsx
<PButton aria={{ 'aria-label': 'Close dialog' }} icon="close" />
```

### Expanded state

```jsx
<PButton aria={{ 'aria-expanded': isOpen }}>Open</PButton>
```

### Description

```jsx
<pTextfield label="Email" aria={{ 'aria-description': 'Long description' }} />
```

## Verify

Re-run axe on affected URL; confirm rule passes and shadow DOM reflects ARIA.
