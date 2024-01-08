export type handleBottleClickType = (
  i: number,
  bottleRef: React.MutableRefObject<HTMLDivElement | null>
) => void;

export type BottleProps = {
  i: number;
  bottle: BottleType;
  bottleParts: number;
  handleBottleClick: handleBottleClickType;
};

export type ColorsType = '#f9bc60' | '#abd1c6' | '#e16162';

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

export type GameProps = {
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
};
