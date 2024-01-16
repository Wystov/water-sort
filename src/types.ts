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

export type ColorsType =
  | '#f9bc60'
  | '#abd1c6'
  | '#e16162'
  | '#a786df'
  | '#ffa8ba'
  | '#6246ea'
  | '#078080'
  | '#00214d';

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
