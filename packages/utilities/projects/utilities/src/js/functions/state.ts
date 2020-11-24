import { color } from '../variables';

type PseudoElement = '::before' | '::after';

type Options = { focusColor?: string; offset?: number; pseudo?: PseudoElement };

const defaultOptions: Options = { focusColor: color.state.focus, offset: 1 };

export const focus = (opts?: Options): string => {
  const options: Options = { ...defaultOptions, ...opts };
  const { focusColor, offset, pseudo = '' } = options;

  return `
::-moz-focus-inner { border: 0; }
${pseudo ? `&${pseudo}{` : ''}
outline: transparent solid 1px;
outline-offset: ${offset}px;
${
  pseudo
    ? `content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;}` // Closing bracket from adding &${pseudo}
    : ''
}
&:focus${pseudo} { outline-color: ${focusColor}; }
&:focus:not(:focus-visible)${pseudo} { outline-color: transparent; }`;
};
