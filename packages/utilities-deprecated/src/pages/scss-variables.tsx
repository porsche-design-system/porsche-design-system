import cx from 'clsx';
import './scss-variables.scss';

const defaultColors = {
  'theme-light-brand': '#d5001c',
  'theme-light-default': '#000',
  'theme-light-background-default': '#fff',
  'theme-light-background-surface': '#f2f2f2',
  'theme-light-background-shading': 'rgba(14, 20, 24, 0.9)',
  'theme-light-neutral-contrast-high': '#323639',
  'theme-light-neutral-contrast-medium': '#626669',
  'theme-light-neutral-contrast-low': '#e3e4e5',
  'theme-light-notification-success': '#018a16',
  'theme-light-notification-success-soft': '#e5f3e7',
  'theme-light-notification-warning': '#ff9b00',
  'theme-light-notification-warning-soft': '#fff5e5',
  'theme-light-notification-error': '#e00000',
  'theme-light-notification-error-soft': '#fae6e6',
  'theme-light-notification-neutral': '#0061bd',
  'theme-light-notification-neutral-soft': '#e5eff8',
  'theme-light-state-hover': '#d5001c',
  'theme-light-state-active': '#d5001c',
  'theme-light-state-focus': 'currentColor',
  'theme-light-state-disabled': '#96989a',
  'external-facebook': '#1877f2',
  'external-google': '#4285f4',
  'external-instagram': '#e1306c',
  'external-kakaotalk': '#fae300',
  'external-linkedin': '#0077b5',
  'external-naver': '#03cf5d',
  'external-pinterest': '#e60023',
  'external-reddit': '#ff4500',
  'external-tiktok': '#fe2c55',
  'external-twitter': '#1da1f2',
  'external-wechat': '#1aad19',
  'external-whatsapp': '#25d366',
  'external-xing': '#006567',
  'external-youtube': '#ff0000',
};

const darkThemeColors = {
  'theme-dark-brand': '#d5001c',
  'theme-dark-default': '#fff',
  'theme-dark-background-default': '#0e1418',
  'theme-dark-background-surface': '#262b2e',
  'theme-dark-background-shading': 'rgba(14, 20, 24, 0.9)',
  'theme-dark-neutral-contrast-high': '#e3e4e5',
  'theme-dark-neutral-contrast-medium': '#b0b1b2',
  'theme-dark-neutral-contrast-low': '#4a4e51',
  'theme-dark-notification-success': '#01ba1d',
  'theme-dark-notification-success-soft': '#bfeec6',
  'theme-dark-notification-warning': '#ff9b00',
  'theme-dark-notification-warning-soft': '#ffe6bf',
  'theme-dark-notification-error': '#fc1717',
  'theme-dark-notification-error-soft': '#fec5c5',
  'theme-dark-notification-neutral': '#2193ff',
  'theme-dark-notification-neutral-soft': '#c7e4ff',
  'theme-dark-state-hover': '#ff0223',
  'theme-dark-state-active': '#ff0223',
  'theme-dark-state-focus': 'currentColor',
  'theme-dark-state-disabled': '#7c7f81',
};

const lightElectricThemeColors = {
  'theme-light-electric-brand': '#00b0f4',
  'theme-light-electric-default': '#000',
  'theme-light-electric-background-default': '#fff',
  'theme-light-electric-background-surface': '#f2f2f2',
  'theme-light-electric-background-shading': 'rgba(14, 20, 24, 0.9)',
  'theme-light-electric-neutral-contrast-high': '#323639',
  'theme-light-electric-neutral-contrast-medium': '#626669',
  'theme-light-electric-neutral-contrast-low': '#e3e4e5',
  'theme-light-electric-notification-success': '#018a16',
  'theme-light-electric-notification-success-soft': '#e5f3e7',
  'theme-light-electric-notification-warning': '#ff9b00',
  'theme-light-electric-notification-warning-soft': '#fff5e5',
  'theme-light-electric-notification-error': '#e00000',
  'theme-light-electric-notification-error-soft': '#fae6e6',
  'theme-light-electric-notification-neutral': '#0061bd',
  'theme-light-electric-notification-neutral-soft': '#e5eff8',
  'theme-light-electric-state-hover': '#00b0f4',
  'theme-light-electric-state-active': '#00b0f4',
  'theme-light-electric-state-focus': 'currentColor',
  'theme-light-electric-state-disabled': '#96989a',
};

const darkElectricThemeColors = {
  'theme-dark-electric-brand': '#00b0f4',
  'theme-dark-electric-default': '#fff',
  'theme-dark-electric-background-default': '#0e1418',
  'theme-dark-electric-background-surface': '#262b2e',
  'theme-dark-electric-background-shading': 'rgba(14, 20, 24, 0.9)',
  'theme-dark-electric-neutral-contrast-high': '#e3e4e5',
  'theme-dark-electric-neutral-contrast-medium': '#b0b1b2',
  'theme-dark-electric-neutral-contrast-low': '#4a4e51',
  'theme-dark-electric-notification-success': '#01ba1d',
  'theme-dark-electric-notification-success-soft': '#bfeec6',
  'theme-dark-electric-notification-warning': '#ff9b00',
  'theme-dark-electric-notification-warning-soft': '#ffe6bf',
  'theme-dark-electric-notification-error': '#fc1717',
  'theme-dark-electric-notification-error-soft': '#fec5c5',
  'theme-dark-electric-notification-neutral': '#2193ff',
  'theme-dark-electric-notification-neutral-soft': '#c7e4ff',
  'theme-dark-electric-state-hover': '#00b0f4',
  'theme-dark-electric-state-active': '#00b0f4',
  'theme-dark-electric-state-focus': 'currentColor',
  'theme-dark-electric-state-disabled': '#7c7f81',
};

const fontWeights = ['thin', 'regular', 'semibold', 'bold'];
const fontSizes = [
  '12',
  '16',
  '18',
  '20',
  '22',
  '24',
  '28',
  '30',
  '32',
  '36',
  '42',
  '44',
  '48',
  '52',
  '60',
  '62',
  '72',
  '84',
  'xSmall',
  'small',
  'medium',
  'large',
  'xLarge',
];

const headlines = [1, 2, 3, 4, 5];
const spacings = [4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
const layouts = ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge'];

export const ScssVariables = (): JSX.Element => (
  <>
    <div className="playground">
      <h2>Default Colors</h2>
      {Object.entries(defaultColors).map(([key, value]) => (
        <div key={key} className={cx('square', `square--color-${key}`)} children={value} />
      ))}
    </div>

    <div className="playground">
      <h2>Dark Theme Colors</h2>
      {Object.entries(darkThemeColors).map(([key, value]) => (
        <div key={key} className={cx('square', `square--color-${key}`)} children={value} />
      ))}
    </div>

    <div className="playground">
      <h2>Light-Electric Theme Colors</h2>
      {Object.entries(lightElectricThemeColors).map(([key, value]) => (
        <div key={key} className={cx('square', `square--color-${key}`)} children={value} />
      ))}
    </div>

    <div className="playground">
      <h2>Dark-Electric Theme Colors</h2>
      {Object.entries(darkElectricThemeColors).map(([key, value]) => (
        <div key={key} className={cx('square', `square--color-${key}`)} children={value} />
      ))}
    </div>

    <div className="playground">
      <h2>Font Weights</h2>
      {fontWeights.map((value) => (
        <div key={value} className={cx('font', `font--${value}`)} children={`Font ${value}`} />
      ))}
    </div>

    <div className="playground">
      <h2>Font Sizes</h2>
      {fontSizes.map((value) => (
        <div key={value} className={cx('font', `font--size-${value}`)} children={`Font ${value}`} />
      ))}
    </div>

    <div className="playground">
      <h2>Titles</h2>
      <div className="title-large">Title large</div>
    </div>

    <div className="playground">
      <h2>Headlines</h2>
      {headlines.map((value) => (
        <div key={value} className={`headline-${value}`} children={`Headline${value}`} />
      ))}
    </div>

    <div className="playground">
      <h2>Text</h2>
      <div className="font">Some Text</div>
    </div>

    <div className="playground">
      <h2>Spacing</h2>
      <div className="dark">
        {spacings.map((value) => (
          <div key={value} className={cx('square', `square--spacing-${value}`)} children={value} />
        ))}
      </div>
    </div>

    <div className="playground">
      <h2>Layout</h2>
      <div className="dark">
        {layouts.map((value) => (
          <div key={value} className={cx('square', `square--layout-${value}`)} children={value} />
        ))}
      </div>
    </div>
  </>
);
