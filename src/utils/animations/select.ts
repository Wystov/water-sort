import { AnimationType } from '@/types';

export const select = (reverse?: 'reverse'): AnimationType => {
  const animation: Keyframe[] = [
    {
      transform: 'translate(0, 0)',
    },
    {
      transform: 'translate(0, -15px)',
    },
  ];
  const options: KeyframeAnimationOptions = { fill: 'forwards', duration: 300 };

  if (reverse) animation.reverse();

  return [animation, options];
};
