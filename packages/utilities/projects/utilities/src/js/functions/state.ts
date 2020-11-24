import { color } from '../variables';

type Pseudo = '::before' | '::after';

export const pFocus = (focusColor: string = color.state.focus, offset: number = 1, pseudo?: Pseudo): string => {
  const mozStyle = '::-moz-focus-inner { border: 0; }';

  const focusStyle = `
    outline: transparent solid 1px;
    outline-offset: ${offset}px;`;

  const pseudoElement = `
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    `;

  if (pseudo) {
    return `
      ${mozStyle}
      ${focusStyle}
      ${pseudoElement}
      &:focus#{${pseudo}} { outline-color: ${focusColor};}
      &:focus:not(:focus-visible)#{${pseudo}} { outline-color: transparent;}
    `;
  } else {
    return `
      ${mozStyle}
      ${focusStyle}
      &:focus { outline-color: ${focusColor};}
      &:focus:not(:focus-visible) { outline-color: transparent;}
    `;
  }
};
