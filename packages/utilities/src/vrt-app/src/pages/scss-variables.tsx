import React, { CSSProperties } from 'react';
import './scss-variables.scss';
import cx from 'classnames';

export const ScssVariables = (): JSX.Element => {
  const defaultColorArray = {
    'theme-light-brand': '#d5001c',
    'theme-light-default': '#000',
    'theme-light-surface': '#f2f2f2',
    'theme-light-background': '#fff',
    'theme-light-neutral-contrast-high': '#323639',
    'theme-light-neutral-contrast-medium': '#626669',
    'theme-light-neutral-contrast-low': '#c9cacb',
    'theme-light-notification-success': '#018a16',
    'theme-light-notification-warning': '#ff9b00',
    'theme-light-notification-error': '#e00000',
    'theme-light-state-hover': '#d5001c',
    'theme-light-state-active': '#d5001c',
    'theme-light-state-focus': '#00d5b9',
    'theme-light-state-disabled': '#96989a',
    'external-facebook': '#1877f2',
    'external-google': '#4285f4',
    'external-instagram': '#e1306c',
    'external-linkedin': '#0077b5',
    'external-pinterest': '#e60023',
    'external-twitter': '#1da1f2',
    'external-wechat': '#1aad19',
    'external-whatsapp': '#25d366',
    'external-xing': '#006567',
    'external-youtube': '#ff0000'
  };

  const darkThemeColorArray = {
    'theme-dark-brand': '#d5001c',
    'theme-dark-default': '#fff',
    'theme-dark-surface': '#1a2023',
    'theme-dark-background': '#0e1418',
    'theme-dark-neutral-contrast-high': '#e3e4e5',
    'theme-dark-neutral-contrast-medium': '#b0b1b2',
    'theme-dark-neutral-contrast-low': '#4a4e51',
    'theme-dark-notification-success': '#01ba1d',
    'theme-dark-notification-warning': '#ff9b00',
    'theme-dark-notification-error': '#fc1717',
    'theme-dark-state-hover': '#d5001c',
    'theme-dark-state-active': '#d5001c',
    'theme-dark-state-focus': '#00d5b9',
    'theme-dark-state-disabled': '#7c7f81'
  };

  const fontSizeArray = {
    'size-12': '12',
    'size-16': '16',
    'size-18': '18',
    'size-20': '20',
    'size-22': '22',
    'size-24': '24',
    'size-28': '28',
    'size-30': '30',
    'size-32': '32',
    'size-36': '36',
    'size-42': '42',
    'size-44': '44',
    'size-48': '48',
    'size-52': '52',
    'size-60': '60',
    'size-62': '62',
    'size-72': '72',
    'size-84': '84',
    'size-x-small': 'xSmall',
    'size-small': 'small',
    'size-medium': 'medium',
    'size-large': 'large',
    'size-x-large': 'xLarge'
  };

  const weightArray = ['thin', 'regular', 'semibold', 'bold'];

  const headlineArray = {
    'headline-1': '1',
    'headline-2': '2',
    'headline-3': '3',
    'headline-4': '4',
    'headline-5': '5'
  };

  const spacingArray = {
    'spacing-4': '4',
    'spacing-8': '8',
    'spacing-16': '16',
    'spacing-24': '24',
    'spacing-32': '32',
    'spacing-40': '40',
    'spacing-48': '48',
    'spacing-56': '56',
    'spacing-64': '64',
    'spacing-72': '72',
    'spacing-80': '80'
  };

  const layoutArray = {
    'x-small': 'xSmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    'x-large': 'xLarge',
    'xx-large': 'xxLarge'
  };

  return (
    <>
      <div className="playground">
        <h2>Default Colors</h2>
        {Object.entries(defaultColorArray).map(([key, value]) => (
          <div key={key} className={cx('square', `square--color-${key}`)}>
            {value}
          </div>
        ))}
      </div>

      <div className="playground">
        <h2>Dark Theme Colors</h2>
        {Object.entries(darkThemeColorArray).map(([key, value]) => (
          <div key={key} className={cx('square', `square--color-${key}`)}>
            {value}
          </div>
        ))}
      </div>

      <div className="playground">
        <h2>Font Weights</h2>
        {weightArray.map((x, index) => (
          <div key={index} className={cx('font', 'font--weight', `font--weight--${x}`)}>
            Font {x}
          </div>
        ))}
      </div>

      <div className="playground">
        <h2>Font Sizes</h2>
        {Object.entries(fontSizeArray).map(([key, value]) => (
          <div key={key} className={cx('font', `font--${key}`)}>
            Font {value}
          </div>
        ))}
      </div>

      <div className="playground">
        <h2>Titles</h2>
        <div className="large-title">Title large</div>
      </div>

      <div className="playground">
        <h2>Headlines</h2>
        {Object.entries(headlineArray).map(([key, value]) => (
          <div key={key} className={cx('headlines', `headlines--${key}`)}>
            Headline{value}
          </div>
        ))}
      </div>

      <div className="playground">
        <h2>Text</h2>
        <div className="font">Some Text</div>
      </div>

      <div className="playground">
        <h2>Spacing</h2>
        <div className="dark">
          {Object.entries(spacingArray).map(([key, val]) => (
            <div key={key} className={cx('square', `square--${key}`)} children={val} />
          ))}
        </div>
      </div>

      <div className="playground">
        <h2>Layout</h2>
        <div className="dark">
          {Object.entries(layoutArray).map(([key, val]) => (
            <div key={key} className={cx('square', 'square--layout', `square--layout--${key}`)} children={val} />
          ))}
        </div>
      </div>
    </>
  );
};
