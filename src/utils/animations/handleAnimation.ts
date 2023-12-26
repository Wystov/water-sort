import { AnimationType } from '@/types';

export const handleAnimation = (
  element: HTMLDivElement,
  animationOptions: AnimationType
) => {
  const animation = element.animate(...animationOptions);
  animation.onfinish = () => {
    animation.commitStyles();
    animation.cancel();
  };
};
