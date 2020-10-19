# Button

The `<p-button>` component is essential for performing form or interaction events.

It can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label,it is best practice to provide a descriptive label text for screen readers.

## Variants

Choose between predefined styling variants.

### Primary

```
{ themeable: true, spacing: 'inline' }
<p-button variant="primary">Some label</p-button>
<p-button variant="primary" disabled>Some label</p-button>
<p-button variant="primary" loading>Some label</p-button>
<br>
<p-button variant="primary" hide-label="true">Some label</p-button>
<p-button variant="primary" hide-label="true" disabled>Some label</p-button>
<p-button variant="primary" hide-label="true" loading>Some label</p-button>
```

### Secondary

```
{ themeable: false }
<p-button variant="secondary">Some label</p-button>
<p-button variant="secondary" disabled>Some label</p-button>
<p-button variant="secondary" loading>Some label</p-button>
```