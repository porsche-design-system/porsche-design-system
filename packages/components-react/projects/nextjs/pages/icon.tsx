/* Auto Generated File */
import type { NextPage } from 'next';
import { PIcon, PText } from '@porsche-design-system/components-react/ssr';
import { ICON_NAMES } from '@porsche-design-system/assets';

const IconPage: NextPage = (): JSX.Element => {
  const style = `
    .playground.overview p-icon {
      filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%25' height='100%25' focusable='false'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%2300d5b9%7D%3C/style%3E%3C/defs%3E%3Cpath id='_safezone' d='M23 1v22H1V1h22m.1-.1H.9v22.2h22.2V.9z' class='cls-1' data-name='❌ safezone'/%3E%3Cpath id='basic_shape_square' d='M18 6v12H6V6h12m.1-.1H5.9v12.2h12.2V5.9z' class='cls-1' data-name='basic shape – square'/%3E%3Cpath id='basic_shape_complex' d='M21 3v18H3V3h18m.1-.1H2.9v18.2h18.2V2.9z' class='cls-1' data-name='basic shape – complex'/%3E%3Cpath id='basic_shape_wide' d='M20 7v10H4V7h16m.1-.1H3.9v10.2h16.2V6.9z' class='cls-1' data-name='basic shape – wide'/%3E%3Cpath id='basic_shape_high' d='M17 4v16H7V4h10m.1-.1H6.9v16.2h10.2V3.9z' class='cls-1' data-name='basic shape – high'/%3E%3Cpath id='basic_shape_wide_narrow' d='M22 8v8H2V8h20m.1-.1H1.9v8.2h20.2V7.9z' class='cls-1' data-name='basic shape – wide &amp; narrow'/%3E%3Cpath id='basic_shape_high_narrow' d='M17 2v20H7V2h10m.1-.1H6.9v20.2h10.2V1.9z' class='cls-1' data-name='basic shape – high &amp; narrow'/%3E%3C/svg%3E");
      background-size: cover;
      width: 48px;
      height: 48px;
    }
    p-text {
      display: inline-block !important;
      vertical-align: top;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with default settings">
        <PIcon />
      </div>

      <div className="playground light" title="should render in different sizes and be in sync with text sizes">
        <div>
          <PIcon size="x-small" />
          <PText size="x-small">X Small</PText>
        </div>
        <div>
          <PIcon size="small" />
          <PText size="small">Small</PText>
        </div>
        <div>
          <PIcon size="medium" />
          <PText size="medium">Medium</PText>
        </div>
        <div>
          <PIcon size="large" />
          <PText size="large">Large</PText>
        </div>
        <div>
          <PIcon size="x-large" />
          <PText size="x-large">X Large</PText>
        </div>
        <PIcon size="inherit" style={{ width: '60px', height: '60px' }} />
      </div>

      <div className="playground light" title="should render with predefined colors on light theme">
        <PIcon theme="light" color="primary" />
        <PIcon theme="light" color="brand" />
        <PIcon theme="light" color="default" />
        <PIcon theme="light" color="contrast-low" />
        <PIcon theme="light" color="neutral-contrast-low" />
        <PIcon theme="light" color="contrast-medium" />
        <PIcon theme="light" color="neutral-contrast-medium" />
        <PIcon theme="light" color="contrast-high" />
        <PIcon theme="light" color="neutral-contrast-high" />
        <PIcon theme="light" color="notification-success" />
        <PIcon theme="light" color="notification-warning" />
        <PIcon theme="light" color="notification-error" />
        <PIcon theme="light" color="notification-info" />
        <PIcon theme="light" color="notification-neutral" />
        <PIcon theme="light" color="state-disabled" />
        <PIcon
          theme="light"
          color="inherit"
          style={{ filter: 'invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)' }}
         />
      </div>

      <div className="playground dark" title="should render with predefined colors on dark theme">
        <PIcon theme="dark" color="primary" />
        <PIcon theme="dark" color="brand" />
        <PIcon theme="dark" color="default" />
        <PIcon theme="dark" color="contrast-low" />
        <PIcon theme="dark" color="neutral-contrast-low" />
        <PIcon theme="dark" color="contrast-medium" />
        <PIcon theme="dark" color="neutral-contrast-medium" />
        <PIcon theme="dark" color="contrast-high" />
        <PIcon theme="dark" color="neutral-contrast-high" />
        <PIcon theme="dark" color="notification-success" />
        <PIcon theme="dark" color="notification-warning" />
        <PIcon theme="dark" color="notification-error" />
        <PIcon theme="dark" color="notification-info" />
        <PIcon theme="dark" color="notification-neutral" />
        <PIcon theme="dark" color="state-disabled" />
        <PIcon
          theme="dark"
          color="inherit"
          style={{ filter: 'invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)' }}
         />
      </div>

      <div className="playground light" title="should render with custom icon">
        <PIcon
          theme="light"
          source="./assets/icon-custom-kaixin.svg"
          aria-label="Icon for social media platform Kaixin"
         />
      </div>

      <div className="playground dark" title="should render with custom icon on dark theme">
        <PIcon
          theme="dark"
          source="./assets/icon-custom-kaixin.svg"
          aria-label="Icon for social media platform Kaixin"
         />
      </div>

      <div className="playground light overview" title="should render all available icons and apply coloring programmatically">
        {ICON_NAMES.map((x) => (
          <PIcon key={x} name={x as any} size="inherit" color="inherit" aria-label={`${x} icon`} />
        ))}
      </div>
    </>
  );
};

export default IconPage;
