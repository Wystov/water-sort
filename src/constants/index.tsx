import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export const DEFAULT_SETTINGS = {
  lvl: 1,
  colors: 2,
  bottleParts: 2,
};

export const COLORS = [
  '#f9bc60',
  '#abd1c6',
  '#e16162',
  '#a786df',
  '#ffa8ba',
  '#6246ea',
  '#c759a7',
  '#009688',
  '#5ed9bd',
  '#4183d7',
  '#c2958c',
  '#6eb67b',
  '#ed7c59',
  '#9848be',
  '#4d3b86',
  '#c0d98a',
  '#b7321f',
  '#8db8d1',
  '#e5d727',
  '#264653',
] as const;

export const PERK_DESCRIPTION = {
  moveBack: {
    title: 'Move back',
    description: 'Move back one step if you make a mistake',
    cost: 10,
    getIcon: ({ size = '32px', color = 'white' } = {}) => (
      <ArrowLeftCircleIcon style={{ height: size, width: size, color }} />
    ),
  },
  pourFromBottom: {
    title: 'Pour from bottom',
    description: 'Pour water from the bottom of selected bottle once',
    cost: 50,
    getIcon: ({ size = '32px', color = 'white' } = {}) => (
      <ArrowDownCircleIcon style={{ height: size, width: size, color }} />
    ),
  },
  addBottle: {
    title: 'Add bottle',
    description: 'Add an extra empty bottle to help solve the puzzle',
    cost: 100,
    getIcon: ({ size = '32px', color = 'white' } = {}) => (
      <PlusCircleIcon style={{ height: size, width: size, color }} />
    ),
  },
} as const;

export const winMessages = [
  'Solved!',
  'You made it!',
  'Splendid sort!',
  'Liquid legend!',
  'Aqua ace!',
  'Puzzle master!',
  'Well done!',
  'Water whiz!',
  'Cascade champ!',
  'Great job!',
  'Bravo!',
  'Nailed it!',
  'Aqua win!',
  'Perfect pour!',
  'Fluid finesse!',
  'Pure precision!',
  'Stream star!',
  'Water ninja!',
  'H2-Woah!',
  'Genius!',
  'Well played!',
  'Outstanding!',
  'Amazing!',
  'Fantastic!',
  'Victory!',
  'Hydro hero!',
  'Flowing win!',
  'Perfect sort!',
];
