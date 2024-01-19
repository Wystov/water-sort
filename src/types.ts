import { COLORS } from './constants';

export type handleBottleClickType = (
  i: number,
  bottleRef: React.MutableRefObject<HTMLDivElement | null>
) => void;

export type BottleProps = {
  i: number;
  bottle: BottleColorsCountType[];
  bottleParts: number;
  handleBottleClick: handleBottleClickType;
};

export type ColorsType = (typeof COLORS)[number];

export type BottleType = Array<ColorsType | null>;

export type BottleColorsCountType = { color: ColorsType; count: number };

export type AnimationType = [Keyframe[], KeyframeAnimationOptions];

type ClickedBottleType = {
  i: number;
  element: HTMLDivElement;
};

export type pourFromType = ClickedBottleType | null;

export type SettingsType = {
  lvl: number;
  colors: number;
  bottleParts: number;
  bottlesCount: number;
};

export type SetSettingsParams = Omit<SettingsType, 'lvl'>;

export type GameControlsProps = {
  resetPourFrom: () => void;
  fromBottom: boolean;
  setFromBottom: (fromBottom: boolean) => void;
};
