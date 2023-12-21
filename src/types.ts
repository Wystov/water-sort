export type BottleProps = {
  i: number;
  bottle: BottleType;
  handleBottleClick: (i: number) => void;
};

export type ColorsType = 'red' | 'green' | 'blue';

export type BottleType = Array<ColorsType | null>;
