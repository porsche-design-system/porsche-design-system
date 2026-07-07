# Fix Guide — Forms and Labels

## When to use

axe rules: `label`, `label-title-only`, `form-field-multiple-labels`, `aria-input-field-name`, `aria-required-parent`

## PDS rules

1. Use `p-text-field`, `p-select`, `p-checkbox`, etc. with `label` prop or slot
2. Never rely on placeholder as the only label
3. Associate errors with `message` prop or `aria-describedby`
4. Group related fields with `p-fieldset`

## Fix patterns

### Labelled field

```jsx
<PTextfield label="VIN" name="vin" required />
```

### Error state

```jsx
<PTextfield
  label="Email"
  state="error"
  message="Enter a valid email address"
/>
```

### Required indicator

Use component `required` prop; do not rely on color alone.

## Verify

- axe `label` passes
- Error message programmatically associated (inspect `aria-describedby` / `aria-invalid`)
- Tab order reaches all fields
