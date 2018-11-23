# Porsche UI Kit React - Docs

## Installation

### Development

Running `npm run start` will start a webpack dev server. You can reach it at `http://localhost:8080/`.

### Distribution

Running `npm run build` creates a ES6 and CommonJS build under `dist`.

## Developing New Components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File Location:** A component is developed as an atom, layout, molecule, organism or screen under `src/components`.
1. **Export:** The component needs to be exported in `src/index.ts`.
1. **Component Description:** A component should have a preceding block comment describing its general purpose.
1. **Prop Types:** The component has to describe its props using react prop types.
1. **Prop Descriptions:** Each prop type should have a preceding block comment which will be used in the props documentation.
1. **Examples:** The examples of the component are developed under `src/examples` with a mirroring folder structure.

### Parent Components

### @see References

Different components can be cross-referenced using the `@see` annotation inside the component description.
Simply put the components name after the annotation and a link to it will automatically appear in the header of the documentation page.
