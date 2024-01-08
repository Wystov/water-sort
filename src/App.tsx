import { useState } from 'react';

import { Game } from './components/Game';
import { Settings } from './components/Settings';
import { SettingsType } from './types';

export const App = () => {
  const [settings, setSettings] = useState<SettingsType>({
    lvl: 1,
    colors: 3,
    bottleParts: 4,
    bottlesCount: 5,
  });

  return (
    <>
      <Settings settings={settings} setSettings={setSettings} />
      <Game settings={settings} setSettings={setSettings} />
    </>
  );
};
