import { AnimationType } from '@/types';

export const moveBottle = (
  fromBottle: HTMLDivElement,
  toBottle: HTMLDivElement
): AnimationType => {
  const from = fromBottle.getBoundingClientRect();
  const to = toBottle.getBoundingClientRect();
  const { width, height } = from;

  const c = {
    x: Math.abs(to.x - from.x) - width / 2,
    y: Math.abs(to.y - from.y) - height / 5,
    rotate: [45, 90],
    transformOrigin: 'top right',
  };

  const isTargetOnTheLeft = from.x - to.x > 0;
  const isTargetOnTop = from.y - to.y > 0;

  if (isTargetOnTheLeft) {
    c.x = -c.x;
    c.rotate = [-45, -90];
    c.transformOrigin = 'top left';
  }

  if (isTargetOnTop) c.y = -c.y - height / 2.5;

  const animation: Keyframe[] = [
    {
      transform: `translate(0, -15px)`,
      transformOrigin: c.transformOrigin,
      zIndex: 2,
    },
    {
      transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rotate[0]}deg)`,
      transformOrigin: c.transformOrigin,
      offset: 0.2,
      zIndex: 2,
    },
    {
      transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rotate[1]}deg)`,
      transformOrigin: c.transformOrigin,
      offset: 0.8,
      zIndex: 2,
    },
    {
      transform: `translate(0) rotate(0)`,
      transformOrigin: c.transformOrigin,
      zIndex: 1,
    },
  ];
  const options: KeyframeAnimationOptions = {
    duration: 800,
    fill: 'forwards',
  };

  return [animation, options];
};
