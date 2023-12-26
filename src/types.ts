export type handleBottleClickType = (
  i: number,
  bottleRef: React.MutableRefObject<HTMLDivElement | null>
) => void;

export type BottleProps = {
  i: number;
  bottle: BottleType;
  handleBottleClick: handleBottleClickType;
};

export type ColorsType = 'red' | 'green' | 'blue';

export type BottleType = Array<ColorsType | null>;

export type AnimationType = [Keyframe[], KeyframeAnimationOptions];

type ClickedBottleType = {
  i: number;
  element: HTMLDivElement;
};

export type pourFromType = ClickedBottleType | null;
