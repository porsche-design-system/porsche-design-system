import type { JssStyle } from 'jss';
import { addImportantToRule } from '../../styles';

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';
export const ANIMATION_DURATION = 600;

export const getBoxShadow = (): JssStyle => ({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05),0 15px 20px 0 rgba(0,0,0,0.2)',
});

export const getAnimationIn = (keyframesName: string, durationVar?: string): JssStyle => {
  const duration = durationVar ? `var(${durationVar},${ANIMATION_DURATION}ms)` : `${ANIMATION_DURATION}ms`;
  return {
    animation: `${duration} $${keyframesName} ${easeInQuad} forwards`,
  };
};

export const getAnimationOut = (keyframesName: string): JssStyle => ({
  animation: addImportantToRule(`${ANIMATION_DURATION}ms $${keyframesName} ${easeOutQuad} forwards`),
});

export type KeyframesDirection = 'in' | 'out';
export const getKeyframes = (direction: KeyframesDirection, outsideStyle: JssStyle): JssStyle => {
  const insideStyle: JssStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };
  return direction === 'in'
    ? {
        from: outsideStyle,
        to: insideStyle,
      }
    : {
        from: insideStyle,
        to: outsideStyle,
      };
};

export const getKeyframesMobile = (direction: KeyframesDirection, bottomVar: string): JssStyle =>
  getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(var(${bottomVar}) + 100%),0)`, // space before and after "+" is crucial
  });
