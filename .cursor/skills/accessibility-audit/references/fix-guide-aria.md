# Fix Guide — ARIA and Names

## When to use

axe rules: `aria-*`, `button-name`, `link-name`, `aria-allowed-attr`, `aria-valid-attr-value`, `aria-required-attr`

## PDS rules

1. Pass ARIA via the component `aria` prop object — never `aria-*` on the host element
2. Icon-only controls need `aria-label` or visible text (with `hide-label` if needed)
3. Do not add ARIA that conflicts with native semantics
4. Check component **Accessibility** tab on the PDS storefront (e.g. [Button accessibility](https://designsystem.porsche.com/v4/components/button/accessibility/))

## Fix patterns

### Named button

```jsx
<p-button aria={{ 'aria-label': 'Close dialog' }} icon="close" />
```

### Expanded state

```jsx
<p-accordion heading="Section" aria={{ 'aria-expanded': isOpen }}>
```

### Described by

```jsx
<p-text-field label="Email" aria={{ 'aria-describedby': 'email-hint' }} />
<p-text id="email-hint">We never share your email.</p-text>
```

## Verify

Re-run axe on affected URL; confirm rule passes and shadow DOM reflects ARIA.
