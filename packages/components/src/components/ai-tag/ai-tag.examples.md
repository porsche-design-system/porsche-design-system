<ComponentHeading name="AI Tag"></ComponentHeading>

`p-ai-tag` is used to indicate AI-generated or AI-assisted content. It displays a localized AI abbreviation with an
icon.

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basic" :config="config"></Playground>

## Icon

The `p-ai-tag` can be displayed with different AI icons by setting the `icon` prop.

<Playground :markup="iconMarkup" :config="config"></Playground>

## Locale

The `p-ai-tag` displays a localized text depending on the `locale` prop.

<Playground :markup="localeMarkup" :config="config"></Playground>

## Text Variant

The `textVariant` prop controls whether the abbreviation (default) or the full spelled-out text is shown.

<Playground :markup="textVariantMarkup" :config="config"></Playground>
