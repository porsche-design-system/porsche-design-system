import { color as colors } from '../variables';

type PseudoElement = '::before' | '::after';

type Options = { color?: string; offset?: string; pseudo?: PseudoElement };

const defaultOptions: Options = { color: colors.state.focus, offset: '2px' };

export const focus = (opts?: Options): string => {
  const options: Options = { ...defaultOptions, ...opts };
  const { color, offset, pseudo = '' } = options;

  return `
::-moz-focus-inner { border: 0; }
${
  pseudo
    ? `
& { outline: transparent none; }
&${pseudo}{`
    : ''
}
outline: transparent solid 1px;
outline-offset: ${offset};
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
&:focus${pseudo} { outline-color: ${color}; }
&:focus:not(:focus-visible)${pseudo} { outline-color: transparent; }`;
};
